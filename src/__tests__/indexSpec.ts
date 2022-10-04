import { config } from 'dotenv';
import { UserModel } from '../resources/user/user.model.js';
async function initTests() {
    config();
    process.env.ENV = 'test';
    await UserModel.initDbWithAdmin();
}
