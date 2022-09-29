import { Category, CategoryDoc, UserRole } from '../../utils/types.js';
import { CategoryModel } from '../../resources/category/category.model.js';
import { UserModel } from '../../resources/user/user.model.js';
import { verifyJWT } from '../../utils/auth.js';
describe('resources/category/category.model.ts testing', () => {
    const model = new CategoryModel();
    const userModel = new UserModel();
    const category: Category = {
        name: 'cat',
        description: 'desc'
    };
    let userId!: string;
    let res!: CategoryDoc;
    beforeAll(async () => {
        // as a general rule each category/product/order when created must be assigned to user who created it so here will create user just for testing to get user id
        const token = await userModel.signUp({
            firstname: 'name',
            lastname: 'name',
            email: 'username',
            password: 'pass',
            role: UserRole.USER
        });
        const payload = verifyJWT(token);
        userId = payload.id;
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
    describe('get all categories', () => {
        it("empty array because ther's no data", async () => {
            await expectAsync(model.index()).toBeResolvedTo([]);
        });
    });
    describe('createOne, must get userid for createdby, and category data', () => {
        it('with user id that does not exist in the database will throw', async () => {
            await expectAsync(
                model.createOne('idnotexist', category)
            ).toBeRejected();
        });
        it('with exist userid', async () => {
            res = await model.createOne(userId, category);
            expect(res.createdby).toEqual(userId);
            expect(res.name).toEqual(category.name);
            expect(res.description).toEqual(category.description);
        });
        it('index should return arrays contain the created one', async () => {
            await expectAsync(model.index()).toBeResolvedTo([res]);
        });
    });
    describe('get one category', () => {
        it('throw with non-exist id', async () => {
            await expectAsync(model.show('nothereid')).toBeRejected();
        });
        it('return category info ', async () => {
            await expectAsync(model.show(res.id)).toBeResolvedTo(res);
        });
    });
    describe('update', () => {
        beforeAll(() => {
            category.name = 'updated';
            res.name = 'updated';
        });
        it('update', async () => {
            await expectAsync(model.updateOne(res.id, category)).toBeResolvedTo(
                res
            );
        });
    });
    describe('delete', () => {
        it('delete and return deleted category info', async () => {
            await expectAsync(model.deleteOne(res.id)).toBeResolvedTo(res);
        });
        it('index return empty array again', async () => {
            await expectAsync(model.index()).toBeResolvedTo([]);
        });
    });
});
