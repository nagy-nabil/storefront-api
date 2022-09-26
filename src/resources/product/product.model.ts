import client from '../../utils/database.js';
import { ModelBase, Product, ProductDoc } from '../../utils/types.js';
export class ProductModel implements ModelBase<Product, ProductDoc> {}
