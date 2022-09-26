import client from '../../utils/database.js';
import { ModelBase, Product, ProductDoc } from '../../utils/types.js';
export class ProductModel implements ModelBase<Product, ProductDoc> {
    async index(): Promise<ProductDoc[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM products;';
            const products = await conn.query({
                text: sql
            });
            conn.release();
            return products.rows;
        } catch (err) {
            throw new Error(`couldn't get products ${err}`);
        }
    }
    async show(id: string): Promise<ProductDoc> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM products WHERE id = $1;';
            const products = await conn.query({
                text: sql,
                values: [id]
            });
            conn.release();
            if (products.rowCount < 1)
                throw new Error('no category with that id');
            return products.rows[0];
        } catch (err) {
            throw new Error(`couldn't get products ${err}`);
        }
    }
    async createOne(userID: string, arg: Product): Promise<ProductDoc> {
        try {
            const conn = await client.connect();
            const sql =
                'INSERT INTO products (name, price, category, createdby) VALUES ($1, $2, $3, $4 ) RETURNING *;';
            const products = await conn.query({
                text: sql,
                values: [arg.name, arg.price, arg.category, userID]
            });
            conn.release();
            return products.rows[0];
        } catch (err) {
            throw new Error(`couldn't create products ${err}`);
        }
    }
    async updateOne(id: string, arg: Product): Promise<ProductDoc> {
        try {
            const conn = await client.connect();
            const sql =
                'UPDATE products SET name = $2, price = $3, category = $4 WHERE id = $1 RETURNING *;';
            const products = await conn.query({
                text: sql,
                values: [id, arg.name, arg.price, arg.category]
            });
            conn.release();
            if (products.rowCount < 1)
                throw new Error(`no product with the id ${id}`);
            return products.rows[0];
        } catch (err) {
            throw new Error(`couldn't update products ${err}`);
        }
    }
    async deleteOne(id: string): Promise<ProductDoc> {
        try {
            const conn = await client.connect();
            const sql = 'DELETE FROM products WHERE id = $1 RETURNING *;';
            const products = await conn.query({
                text: sql,
                values: [id]
            });
            conn.release();
            if (products.rowCount < 1)
                throw new Error(`no product with the id ${id}`);
            return products.rows[0];
        } catch (err) {
            throw new Error(`couldn't delete products ${err}`);
        }
    }
    async productsByCategory(catId: string): Promise<ProductDoc[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM products WHERE category = $1 ;';
            const products = await conn.query({
                text: sql,
                values: [catId]
            });
            conn.release();
            return products.rows;
        } catch (err) {
            throw new Error(`couldn't delete products ${err}`);
        }
    }
}
