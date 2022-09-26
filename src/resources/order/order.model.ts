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
}
