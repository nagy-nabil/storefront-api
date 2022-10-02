import { User, UserRole } from '../../utils/types.js';
import { UserModel } from '../../resources/user/user.model.js';
import { verifyJWT } from '../../utils/auth.js';
describe('resources/user/user.model.ts testing', () => {
    const model = new UserModel();
    const user: User = {
        firstname: 'fir',
        lastname: 'last',
        email: 'email',
        password: 'pass',
        role: UserRole.ADMIN
    };
    let token!: string;
    describe('main methods exist', () => {
        it('index exist', () => {
            expect(model.index).toBeDefined();
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
    describe('signup', () => {
        it('with full data,success and return user token', async () => {
            token = await model.signUp(user);
            const payload = verifyJWT(token);
            expect(payload.firstname).toEqual('fir');
            expect(payload.role).toEqual('user');
            expect(payload.password).toBeUndefined();
        });
    });
    describe('signIn', () => {
        it('with the right data return user token', async () => {
            token = await model.signIn({ email: 'email', password: 'pass' });
            const payload = verifyJWT(token);
            expect(payload.firstname).toEqual('fir');
            expect(payload.role).toEqual('user');
            expect(payload.email).toEqual('email');
            expect(payload.password).toBeUndefined();
        });
    });
});
