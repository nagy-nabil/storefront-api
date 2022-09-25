import { OrderModel } from '../../resources/order/order.model.js';
describe('resources/order/order.model.ts testing', () => {
    const model = new OrderModel();
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
});
