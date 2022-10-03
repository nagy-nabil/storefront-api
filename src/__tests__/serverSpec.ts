import Request from 'supertest';
import App from '../server.js';
const superApp = Request(App);
describe('server running', () => {
    let normalUserToken!: string;
    let adminUserToken!: string;
    it('main end point "/"', async (): Promise<void> => {
        const res = await superApp.get('/');
        expect(res.statusCode).toBe(200);
        expect(res.text).toEqual(`we're in the store !`);
    });
    describe('user end points[note that the database must be shipped with admin]', () => {
        describe('normal user with no token', () => {
            it('sign up with no complete req body', async () => {
                const req = superApp.post('/user/signup');
                req.send({ email: 'email' });
                const res = await req;
                expect(res.statusCode).toBe(400);
            });
            it('sign up successfully', async () => {
                const res = await superApp.post('/user/signup').send({
                    firstname: 'firstname',
                    lastname: 'lastname',
                    email: 'newemail22',
                    password: 'pass'
                });
                expect(res.statusCode).toBe(201);
                normalUserToken = res.body.token;
            });
            it('can not sign up with duplicate email', async () => {
                const res = await superApp.post('/user/signup').send({
                    firstname: 'firstname',
                    lastname: 'lastname',
                    email: 'newemail22',
                    password: 'pass'
                });
                expect(res.statusCode).toBe(400);
            });
            it('sign in with already exist admin', async () => {
                const res = await superApp.post('/user/signin').send({
                    email: 'admin',
                    password: 'admin'
                });
                expect(res.statusCode).toBe(201);
                adminUserToken = res.body.token;
            });
            it('sign in with non exist email', async () => {
                const res = await superApp.post('/user/signin').send({
                    email: 'nonexist290138',
                    password: 'admin'
                });
                expect(res.statusCode).toBe(400);
            });
            it('sign in with wrong password', async () => {
                const res = await superApp.post('/user/signin').send({
                    email: 'newemail22',
                    password: 'admin'
                });
                expect(res.statusCode).toBe(400);
            });
            it('sign in req body must contain email, and password', async () => {
                const res = await superApp.post('/user/signin').send({
                    password: 'admin'
                });
                expect(res.statusCode).toBe(400);
            });
        });
        describe('only admin user end points', () => {
            describe('get all admins', () => {
                it('get all admins data with no token must fail', async () => {
                    const res = await superApp.get('/user-admin/admins');
                    expect(res.statusCode).toBe(401);
                });
                it('get all admins data with normal user token must fail', async () => {
                    const res = await superApp
                        .get('/user-admin/admins')
                        .set('authorization', `Bearer ${normalUserToken}`);
                    expect(res.statusCode).toBe(401);
                });
                it('get all admins data with admin user token success', async () => {
                    const res = await superApp
                        .get('/user-admin/admins')
                        .set('authorization', `Bearer ${adminUserToken}`);
                    expect(res.statusCode).toBe(200);
                });
            });
            describe('create new admin[only admin can create another admins]', () => {
                it('create admin with normal user token must fail', async () => {
                    const res = await superApp
                        .post('/user-admin')
                        .set('authorization', `Bearer ${normalUserToken}`);
                    expect(res.statusCode).toBe(401);
                });
                it('create admin with admin user token success', async () => {
                    const res = await superApp
                        .post('/user-admin')
                        .set('authorization', `Bearer ${adminUserToken}`)
                        .send({
                            firstname: 'admin2',
                            lastname: 'admin2',
                            email: 'admin22',
                            password: 'admin'
                        });
                    expect(res.statusCode).toBe(201);
                });
            });
        });
    });
});
