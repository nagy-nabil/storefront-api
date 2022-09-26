import client from '../../utils/database.js';
import { ModelBase, Category, CategoryDoc } from '../../utils/types.js';
export class CategoryModel implements ModelBase<Category, CategoryDoc> {
    async index(): Promise<CategoryDoc[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM categories;';
            const categories = await conn.query({
                text: sql
            });
            conn.release();
            return categories.rows;
        } catch (err) {
            throw new Error(`couldn't get categories ${err}`);
        }
    }
    async show(id: string): Promise<CategoryDoc> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM categories WHERE id = $1;';
            const categories = await conn.query({
                text: sql,
                values: [id]
            });
            conn.release();
            if (categories.rowCount < 1)
                throw new Error('no category with that id');
            return categories.rows[0];
        } catch (err) {
            throw new Error(`couldn't get categories ${err}`);
        }
    }
    async createOne(arg: Category): Promise<CategoryDoc> {
        try {
            const conn = await client.connect();
            const sql =
                'INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *;';
            const categories = await conn.query({
                text: sql,
                values: [arg.name, arg.description]
            });
            conn.release();
            return categories.rows[0];
        } catch (err) {
            throw new Error(`couldn't create categories ${err}`);
        }
    }
    async updateOne(id: string, arg: Category): Promise<CategoryDoc> {
        try {
            const conn = await client.connect();
            const sql =
                'UPDATE categories SET name = $2, description = $3 WHERE id = $1 RETURNING *;';
            const categories = await conn.query({
                text: sql,
                values: [id, arg.name, arg.description]
            });
            conn.release();
            if (categories.rowCount < 1)
                throw new Error('no category with that id');
            return categories.rows[0];
        } catch (err) {
            throw new Error(`couldn't update categories ${err}`);
        }
    }
    async deleteOne(id: string): Promise<CategoryDoc> {
        try {
            const conn = await client.connect();
            const sql = 'DELETE FROM categories WHERE id = $1 RETURNING *;';
            const categories = await conn.query({
                text: sql,
                values: [id]
            });
            conn.release();
            if (categories.rowCount < 1)
                throw new Error('no category with that id');
            return categories.rows[0];
        } catch (err) {
            throw new Error(`couldn't delete categories ${err}`);
        }
    }
}
