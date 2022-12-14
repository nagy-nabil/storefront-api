import client from '../../utils/database.js';
import { ModelBase, Order, OrderDoc } from '../../utils/types.js';
export class OrderModel implements ModelBase<Order, OrderDoc> {
    async index(): Promise<OrderDoc[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders;';
            const orders = await conn.query({
                text: sql
            });
            conn.release();
            return orders.rows;
        } catch (err) {
            throw new Error(`couldn't get orders ${err}`);
        }
    }
    async show(id: string): Promise<OrderDoc> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders WHERE id = $1;';
            const orders = await conn.query({
                text: sql,
                values: [id]
            });
            conn.release();
            if (orders.rowCount < 1)
                throw new Error('no category with that id');
            return orders.rows[0];
        } catch (err) {
            throw new Error(`couldn't get orders ${err}`);
        }
    }
    async createOne(userID: string): Promise<OrderDoc> {
        try {
            const conn = await client.connect();
            const sql =
                'INSERT INTO orders (user_id, createdby) VALUES ($1, $1 ) RETURNING *;';
            const orders = await conn.query({
                text: sql,
                values: [userID]
            });
            conn.release();
            return orders.rows[0];
        } catch (err) {
            throw new Error(`couldn't create orders ${err}`);
        }
    }
    async updateOne(id: string, arg: Order): Promise<OrderDoc> {
        try {
            const conn = await client.connect();
            const sql =
                'UPDATE orders SET status = $2 WHERE id = $1 RETURNING *;';
            const orders = await conn.query({
                text: sql,
                values: [id, arg.status]
            });
            conn.release();
            if (orders.rowCount < 1) throw new Error('no order with that id');
            return orders.rows[0];
        } catch (err) {
            throw new Error(`couldn't update orders ${err}`);
        }
    }
    async deleteOne(id: string): Promise<OrderDoc> {
        try {
            const conn = await client.connect();
            const sql = 'DELETE FROM orders WHERE id = $1 RETURNING *;';
            const orders = await conn.query({
                text: sql,
                values: [id]
            });
            conn.release();
            if (orders.rowCount < 1) throw new Error('no order with that id');
            return orders.rows[0];
        } catch (err) {
            throw new Error(`couldn't delete orders ${err}`);
        }
    }
    async addProductToOrder(
        orderId: string,
        productId: string,
        amount: number
    ): Promise<OrderDoc> {
        try {
            const conn = await client.connect();
            const sql =
                'INSERT INTO order_product(orderid, productid, quantity) VALUES ($1,$2,$3) RETURNING *;';
            const orders = await conn.query({
                text: sql,
                values: [orderId, productId, amount]
            });
            conn.release();
            return orders.rows[0];
        } catch (err) {
            throw new Error(`couldn't add to order ${orderId} ${err}`);
        }
    }
    async activeOrderMeta(userId: string): Promise<OrderDoc> {
        try {
            const conn = await client.connect();
            const sql =
                "SELECT * FROM orders WHERE user_id = $1 AND status = 'active';";
            const orders = await conn.query({
                text: sql,
                values: [userId]
            });
            conn.release();
            if (orders.rowCount < 1)
                throw new Error('no active order for that user');
            return orders.rows[0];
        } catch (err) {
            throw new Error(`couldn't get active order meta data ${err}`);
        }
    }

    async completedOrders(user_id: string): Promise<OrderDoc[]> {
        try {
            const conn = await client.connect();
            const sql =
                "SELECT * FROM ORDERS WHERE user_id = $1 AND status = 'complete';";
            const orders = await conn.query({
                text: sql,
                values: [user_id]
            });
            conn.release();
            return orders.rows;
        } catch (err) {
            throw new Error(`couldn't get orders for user ${user_id} ${err}`);
        }
    }
}
