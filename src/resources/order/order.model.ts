import client from '../../database.js';
import { ModelBase, OrderState, Order, OrderDoc } from '../../types.js';
export class OrderModel implements ModelBase<Order, OrderDoc> {}
