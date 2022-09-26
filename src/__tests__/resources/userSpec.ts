import { UserModel } from '../../resources/user/user.model.js';
describe('resources/user/user.model.ts testing', () => {
    const model = new UserModel();
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
        it('signUp exist', () => {
            expect(model.signUp).toBeDefined();
        });
        it('signIn exist', () => {
            expect(model.signIn).toBeDefined();
        });
        it('passEncrypt exist', () => {
            expect(UserModel.passBcrypt).toBeDefined();
        });
        it('passVerify exist', () => {
            expect(UserModel.passverify).toBeDefined();
        });
    });
    describe('password hashing and verifying', () => {
        const password = 'pass';
        let hash: string;
        it('hash password', async () => {
            hash = await UserModel.passBcrypt(password);
            expect(hash).toBeDefined();
            expect(hash).toBeTruthy();
        });
        it('verify return false with wrong password', async () => {
            const flag = await UserModel.passverify('not right', hash);
            expect(flag).toBeFalse();
        });
        it('verify return true with correct password', async () => {
            const flag = await UserModel.passverify(password, hash);
            expect(flag).toBeTrue();
        });
    });
});
