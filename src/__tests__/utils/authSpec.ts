import { UserDoc, UserRole } from '../../utils/types';
import { createJWT, verifyJWT } from '../../utils/auth';
describe('jwt testing', () => {
    const user: UserDoc = {
        id: '1',
        firstname: 'fir',
        lastname: 'last',
        email: 'fir@gmail.com',
        password: 'pass',
        role: UserRole.USER,
        createdat: new Date()
    };
    const token = createJWT(user);
    it('token contain three parts[header.payload.signature]', () => {
        const parts = token.split('.');
        expect(parts.length).toBe(3);
    });
    it('token resolve to user again', () => {
        const payload = verifyJWT(token);
        expect(payload.id).toEqual('1');
        expect(payload.firstname).toEqual(user.firstname);
        expect(payload.lastname).toEqual(user.lastname);
        expect(payload.password).toEqual(user.password);
        expect(payload.email).toEqual(user.email);
        expect(payload.role).toEqual(user.role);
    });
});
