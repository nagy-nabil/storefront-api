//module contain database related operation to the cart and i execlude those queries from the user , order or product model because those query contain more than table and it's hard to set them in single module
import { OrderDoc, ProductDoc } from '../utils/types';
import client from '../utils/database';
export class CartQuery {
    /**
     * function to return only meta data about user active order
     * @param userId string-uuid
     * @returns Promise<OrderDoc>
     */
    async userActiveOrder(userId: string): Promise<OrderDoc> {
        try {
            const conn = await client.connect();
            const sql =
                "SELECT * FROM ORDERS WHERE user_id = $1 AND status = 'active';";
            const orders = await conn.query({
                text: sql,
                values: [userId]
            });
            if (orders.rowCount < 1) throw new Error('no active order');
            conn.release();
            return orders.rows[0];
        } catch (err) {
            throw new Error(`couldn't get order for user ${userId} ${err}`);
        }
    }
    /**
     * function return current active order with its products
     * @param userId string
     * @returns Promise<OrderDoc & { products: ProductDoc[] }>
     */
    async orderWithProducts(
        userId: string
    ): Promise<OrderDoc & { products: ProductDoc[] }> {
        try {
            const conn = await client.connect();
            let sql =
                "SELECT * FROM ORDERS WHERE user_id = $1 AND status = 'active';";
            const orders = await conn.query({
                text: sql,
                values: [userId]
            });
            if (orders.rowCount < 1) throw new Error('no active order');
            sql =
                'SELECT products.id, products.name, products.price from order_product INNER JOIN products ON order_product.productid = products.id WHERE orderid = $1';
            const products = await conn.query({
                text: sql,
                values: [orders.rows[0].id]
            });
            conn.release();
            return { ...orders.rows[0], products: products.rows };
        } catch (err) {
            throw new Error(`couldn't get order for user ${userId} ${err}`);
        }
    }
}
