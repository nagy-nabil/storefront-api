import client from '../../utils/database.js';
import { User, UserDoc } from '../../utils/types.js';
import { createJWT } from '../../utils/auth.js';
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
     * only return admins to be used in the dashboard
     * @returns UserDoc[]
     */
    async index(): Promise<UserDoc[]> {
        try {
            const conn = await client.connect();
            const sql = "SELECT * FROM users WHERE role = 'admin';";
            const users = await conn.query({
                text: sql
            });
            conn.release();
            return users.rows;
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
                'INSERT INTO users(firstname, lastname,email, password) VALUES ($1,$2,$3,$4) RETURNING *;';
            const res = await conn.query({
                text: sql,
                values: [arg.firstname, arg.lastname, arg.email, pass]
            });
            conn.release();
            const token = createJWT(res.rows[0]);
            return token;
        } catch (err) {
            throw new Error(`couldn't create user ${err}`);
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
            const sql = 'SELECT * FROM users WHERE email = $1';
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
            const token = createJWT(user.rows[0]);
            return token;
        } catch (err) {
            throw new Error(`couldn't sign in with error ${err}`);
        }
    }
}
