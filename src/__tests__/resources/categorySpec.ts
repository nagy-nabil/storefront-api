import { CategoryModel } from '../../resources/category/category.model.js';
describe('resources/user/user.model.ts testing', () => {
    const model = new UserModel();
    describe('main methods exist', () => {
        it('index exist', () => {
            expect(model.index).toBeDefined();
        });
        it('index exist', () => {
            expect(model.show).toBeDefined();
        });
        it('index exist', () => {
            expect(model.createOne).toBeDefined();
        });
        it('index exist', () => {
            expect(model.updateOne).toBeDefined();
        });
        it('index exist', () => {
            expect(model.deleteOne).toBeDefined();
        });
    });
});
