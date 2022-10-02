import { OrderModel } from '../../resources/order/order.model.js';
import { UserModel } from '../../resources/user/user.model.js';
import { OrderDoc, OrderState, UserRole } from '../../utils/types.js';
import { verifyJWT } from '../../utils/auth.js';
describe('resources/order/order.model.ts testing', () => {
    const model = new OrderModel();
    const userModel = new UserModel();
    let userId!: string;
    let res!: OrderDoc;
    beforeAll(async () => {
        // as a general rule each category/product/order when created must be assigned to user who created it so here will create user just for testing to get user id
        const token = await userModel.signUp({
            firstname: 'name',
            lastname: 'name',
            email: 'username3',
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
    describe('createOne, must get userid for createdby, and by default the order is "active"', () => {
        it('with user id that does not exist in the database will throw', async () => {
            await expectAsync(model.createOne('idnotexist')).toBeRejected();
        });
        it('with exist userid', async () => {
            res = await model.createOne(userId);
            expect(res.createdby).toEqual(userId);
        });
        it('index should return array contain the created one', async () => {
            await expectAsync(model.index()).toBeResolvedTo([res]);
        });
    });
    describe('update order to be completed ', () => {
        beforeAll(() => {
            res.status = OrderState.COMPLETE;
        });
        it('update successfully', async () => {
            await expectAsync(model.updateOne(res.id, res)).toBeResolvedTo(res);
        });
        it('get all completed orders by user', async () => {
            await expectAsync(model.completedOrders(userId)).toBeResolvedTo([
                res
            ]);
        });
    });
});
