import {
    CategoryDoc,
    Product,
    ProductDoc,
    UserRole
} from '../../utils/types.js';
import { ProductModel } from '../../resources/product/product.model.js';
import { UserModel } from '../../resources/user/user.model.js';
import { CategoryModel } from '../../resources/category/category.model.js';
import { verifyJWT } from '../../utils/auth.js';
describe('resources/product/product.model.ts testing', () => {
    const model = new ProductModel();
    const userModel = new UserModel();
    const categoryModel = new CategoryModel();
    let userId!: string;
    let category!: CategoryDoc;
    let product!: Product;
    let res!: ProductDoc;
    beforeAll(async () => {
        // as a general rule each category/product/order when created must be assigned to user who created it so here will create user just for testing to get user id
        const token = await userModel.signUp({
            firstname: 'name',
            lastname: 'name',
            email: 'username2',
            password: 'pass',
            role: UserRole.USER
        });
        const payload = verifyJWT(token);
        userId = payload.id;
        category = await categoryModel.createOne(userId, {
            name: 'category',
            description: 'desc'
        });
        product = {
            name: 'prod',
            price: '1000',
            category: category.id
        };
    });
    describe('main methods exist', () => {
        it('index exist', () => {
            expect(model.index).toBeDefined();
        });
        it('show exist', () => {
            expect(model.show).toBeDefined();
        });
        it('createOne exist', () => {
            expect(model.createOne).toBeDefined();
        });
        it('updateOne exist', () => {
            expect(model.updateOne).toBeDefined();
        });
        it('deleteOne exist', () => {
            expect(model.deleteOne).toBeDefined();
        });
    });
    describe('get all products', () => {
        it("empty array because ther's no data", async () => {
            await expectAsync(model.index()).toBeResolvedTo([]);
        });
    });
    describe('createOne, must get userid for createdby, and product data', () => {
        it('with user id that does not exist in the database will throw', async () => {
            await expectAsync(
                model.createOne('idnotexist', product)
            ).toBeRejected();
        });
        it('with exist userid', async () => {
            res = await model.createOne(userId, product);
            expect(res.createdby).toEqual(userId);
            expect(res.name).toEqual(product.name);
            expect(res.price).toEqual('$1,000.00');
        });
        it('index should return arrays contain the created one', async () => {
            await expectAsync(model.index()).toBeResolvedTo([res]);
        });
    });
    describe('get one product', () => {
        it('throw with non-exist id', async () => {
            await expectAsync(model.show('nothereid')).toBeRejected();
        });
        it('return product info ', async () => {
            await expectAsync(model.show(res.id)).toBeResolvedTo(res);
        });
    });
    describe('update', () => {
        beforeAll(() => {
            product.name = 'updated';
            res.name = 'updated';
        });
        it('update successfully', async () => {
            await expectAsync(model.updateOne(res.id, product)).toBeResolvedTo(
                res
            );
        });
    });
    describe('delete', () => {
        it('delete and return deleted product info', async () => {
            await expectAsync(model.deleteOne(res.id)).toBeResolvedTo(res);
        });
        it('index return empty array again', async () => {
            await expectAsync(model.index()).toBeResolvedTo([]);
        });
    });
});
