import client from '../../database.js';
import { ModelBase, UserRole, User, UserDoc } from '../../types.js';
export class UserModel implements ModelBase<User, UserDoc> {}
