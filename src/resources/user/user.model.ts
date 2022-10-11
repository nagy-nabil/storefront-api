import client from '../../utils/database.js';
import { User, UserDoc } from '../../utils/types.js';
import { createJWT } from '../../utils/auth.js';
import { callbackify } from 'util';
import bcrypt from 'bcrypt';
// interface UserModelBase extends ModelBase<User, UserDoc> {
//     signUp(arg: User): Promise<string>;
//     signIn(arg: { email: string; password: string }): Promise<string>;
// }
interface UserModelBase {
    signUp(arg: User): Promise<string>;
    signIn(arg: { email: string; password: string }): Promise<string>;
}
export class UserModel implements UserModelBase {
    /**
     * hsah password with the salt and the rounds
     * @param pass string
     * @returns string
     */
    static async passBcrypt(pass: string): Promise<string> {
        if (!process.env.BCRYPT_SALT || !process.env.BCRYPT_ROUNDS)
            throw new Error('env error [no BCRYPT_SALT || BCRYPT_ROUNDS]');
        const hash = await bcrypt.hash(
            pass + process.env.BCRYPT_SALT,
            +process.env.BCRYPT_ROUNDS
        );
        return hash;
    }
    /**
     * return true if the password is correct with the hash
     * @param pass string [real password]
     * @param hash string
     * @returns
     */
    static async passverify(pass: string, hash: string): Promise<boolean> {
        if (!process.env.BCRYPT_SALT || !process.env.BCRYPT_ROUNDS)
            throw new Error('env error [no BCRYPT_SALT || BCRYPT_ROUNDS]');
        const flag = await bcrypt.compare(pass + process.env.BCRYPT_SALT, hash);
        return flag;
    }

    /**
     *! only used to init the database with admin not supposed to be used in middlewares
     * ,create admin if first time for the database or do nothing
     * @returns Promise<void>
     */
    static async initDbWithAdmin(): Promise<void> {
        try {
            const conn = await client.connect();
            const pass = await UserModel.passBcrypt('admin');
            const sql =
                "INSERT INTO users (firstname, lastname, email, password, role) VALUES ('admin', 'admin','admin',$1,'admin') ON CONFLICT DO NOTHING;";
            await conn.query({
                text: sql,
                values: [pass]
            });
            conn.release();
            return;
        } catch (err) {
            throw new Error(`couldn't get admins ${err}`);
        }
    }
    /**
     * only return admins to be used in the dashboard
     * @returns UserDoc[]
     */
    async indexAdmins(): Promise<UserDoc[]> {
        try {
            const conn = await client.connect();
            const sql =
                "SELECT id, firstname, lastname, email, role FROM users WHERE role = 'admin';";
            const users = await conn.query({
                text: sql
            });
            conn.release();
            return users.rows;
        } catch (err) {
            throw new Error(`couldn't get admins ${err}`);
        }
    }
    async showAdmin(userId: string): Promise<UserDoc> {
        try {
            const conn = await client.connect();
            const sql =
                "SELECT id, firstname, lastname, email, role FROM users WHERE id = $1 AND role = 'admin';";
            const users = await conn.query({
                text: sql,
                values: [userId]
            });
            conn.release();
            return users.rows[0];
        } catch (err) {
            throw new Error(`couldn't get admins ${err}`);
        }
    }
    /**
     * return token if the user was created successfully
     * @param arg User
     * @returns string
     */
    async signUp(arg: User): Promise<string> {
        try {
            const conn = await client.connect();
            const pass = await UserModel.passBcrypt(arg.password);
            const sql =
                'INSERT INTO users(firstname, lastname,email, password) VALUES ($1,$2,$3,$4) RETURNING id,firstname, lastname, email, role;';
            const res = await conn.query({
                text: sql,
                values: [arg.firstname, arg.lastname, arg.email, pass]
            });
            conn.release();
            const token = createJWT(res.rows[0]);
            return token;
        } catch (err) {
            throw new Error(`couldn't signup user ${err}`);
        }
    }
    /**
     * return tokne if signed in successfully
     * @param arg {email: string, password: string}
     * @returns string
     */
    async signIn(arg: { email: string; password: string }): Promise<string> {
        try {
            const conn = await client.connect();
            const sql =
                'SELECT id, firstname, lastname, email,password,role FROM users WHERE email = $1';
            const user = await conn.query({
                text: sql,
                values: [arg.email]
            });
            conn.release();
            if (user.rowCount < 1) throw new Error('no user with that email');
            const flag = await UserModel.passverify(
                arg.password,
                user.rows[0].password
            );
            if (!flag) throw new Error('wrong password');
            const token = createJWT({ ...user.rows[0], password: undefined });
            return token;
        } catch (err) {
            throw new Error(`couldn't sign in with error ${err}`);
        }
    }
    /**
     * give the admin apility to create another admins[staff]
     * @param arg User
     * @returns Promise<string>
     */
    async createAdmin(arg: User): Promise<string> {
        try {
            const conn = await client.connect();
            const pass = await UserModel.passBcrypt(arg.password);
            const sql =
                "INSERT INTO users(firstname, lastname,email, password, role) VALUES ($1,$2,$3,$4,'admin') RETURNING id,firstname, lastname, email, role;";
            const res = await conn.query({
                text: sql,
                values: [arg.firstname, arg.lastname, arg.email, pass]
            });
            conn.release();
            const token = createJWT(res.rows[0]);
            return token;
        } catch (err) {
            throw new Error(`couldn't create admin ${err}`);
        }
    }
    /**
     * use it with post or put not decided yet which part to update user password
     * , return true if successed
     * @param userId string
     * @param password string-new password
     * @returns boolean
     */
    async updatePass(userId: string, password: string): Promise<boolean> {
        try {
            const conn = await client.connect();
            const pass = await UserModel.passBcrypt(password);
            const sql =
                'UPDATE users SET password = $2 WHERE id = $1 RETURNING *;';
            await conn.query({
                text: sql,
                values: [userId, pass]
            });
            conn.release();
            return true;
        } catch (err) {
            throw new Error(`couldn't create admin ${err}`);
        }
    }
}
// // because i can
// db-migrate don't work with ecma6 so i can't use top level await in index.ts so as a work around using callbackify
export const initDbWithAdminCB = callbackify(UserModel.initDbWithAdmin);
