import { Category } from '../../utils/types.js';
import { CategoryModel } from '../../resources/category/category.model.js';
describe('resources/category/category.model.ts testing', () => {
    const model = new CategoryModel();
    const category: Category = {
        name: 'cat',
        description: 'desc'
    };
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
    // describe('createOne, must get userid for createdby, and category data', () => {
    //     it('with no user', () => {
    //         const res = await model.createOne()
    //     });
    // });
});
