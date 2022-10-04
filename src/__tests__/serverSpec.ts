import Request from 'supertest';
import App from '../server.js';
const superApp = Request(App);
let normalUserToken!: string;
let adminUserToken!: string;
let categoryId!: string;
let productId!: string;
describe('server running', () => {
    describe('main end point', () => {
        it('main end point "/"', async (): Promise<void> => {
            const res = await superApp.get('/');
            expect(res.statusCode).toBe(200);
            expect(res.text).toEqual(`we're in the store !`);
        });
    });
});

describe('user end points[note that the database must be shipped with admin]', () => {
    describe('normal user with no token', () => {
        it('sign up successfully', async () => {
            const res = await superApp.post('/user/signup').send({
                firstname: 'firstname',
                lastname: 'lastname',
                email: 'newemail22',
                password: 'pass'
            });
            normalUserToken = res.body.token;
            expect(res.statusCode).toBe(201);
        });
        it('sign up with no complete req body', async () => {
            const req = superApp.post('/user/signup');
            req.send({ email: 'email' });
            const res = await req;
            expect(res.statusCode).toBe(400);
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
            adminUserToken = res.body.token;
            expect(res.statusCode).toBe(201);
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
describe('category end points tests[all category routes are done by the admin only]', () => {
    describe('index', () => {
        it('can not do request without token', async () => {
            const res = await superApp.get('/category');
            expect(res.statusCode).toBe(401);
        });
        it('can not do request with normal user token', async () => {
            const res = await superApp
                .get('/category')
                .set('authorization', `Bearer ${normalUserToken}`);
            expect(res.statusCode).toBe(401);
        });
        it('get all cateogories with admin token successfully', async () => {
            const res = await superApp
                .get('/category')
                .set('authorization', `Bearer ${adminUserToken}`);
            expect(res.statusCode).toBe(200);
        });
    });
    describe('createOne', () => {
        it('create one successfully with admin token', async () => {
            const res = await superApp
                .post('/category')
                .set('authorization', `Bearer ${adminUserToken}`)
                .send({
                    name: 'newcate',
                    description: 'desc'
                });
            expect(res.statusCode).toBe(201);
            categoryId = res.body.data.id;
        });
    });
    describe('show', () => {
        it('get one category with its id with admin token successfully', async () => {
            const res = await superApp
                .get(`/category/${categoryId}`)
                .set('authorization', `Bearer ${adminUserToken}`);
            expect(res.statusCode).toBe(200);
        });
        it('get one category with non exist id must fail', async () => {
            const res = await superApp
                .get(`/category/zzzzzzzz-3b6f-4998-9592-zzzzzzzzzzza`)
                .set('authorization', `Bearer ${adminUserToken}`);
            expect(res.statusCode).toBe(400);
        });
    });
    describe('updateOne', () => {
        it('update category with its id but not complete req body', async () => {
            const res = await superApp
                .put(`/category/${categoryId}`)
                .set('authorization', `Bearer ${adminUserToken}`);
            expect(res.statusCode).toBe(400);
        });
        it('update category with its id with admin token successfully and complete req body', async () => {
            const res = await superApp
                .put(`/category/${categoryId}`)
                .set('authorization', `Bearer ${adminUserToken}`)
                .send({
                    name: 'updatednewcate',
                    description: 'desc'
                });
            expect(res.statusCode).toBe(200);
        });
        it('update category with non exist id must fail ', async () => {
            const res = await superApp
                .put(`/category/zzzzzzzz-3b6f-4998-9592-zzzzzzzzzzza`)
                .set('authorization', `Bearer ${adminUserToken}`)
                .send({
                    name: 'updatednewcate2131',
                    description: 'desc'
                });
            expect(res.statusCode).toBe(400);
        });
    });
    describe('deleteOne', () => {
        afterAll(async () => {
            //re create the category for the next tests
            const res = await superApp
                .post('/category')
                .set('authorization', `Bearer ${adminUserToken}`)
                .send({
                    name: 'newcate',
                    description: 'desc'
                });
            categoryId = res.body.data.id;
        });
        it('delete category with its id', async () => {
            const res = await superApp
                .delete(`/category/${categoryId}`)
                .set('authorization', `Bearer ${adminUserToken}`);
            expect(res.statusCode).toBe(200);
        });
        it('delete category with non exist id must fail ', async () => {
            const res = await superApp
                .delete(`/category/${categoryId}`)
                .set('authorization', `Bearer ${adminUserToken}`);
            expect(res.statusCode).toBe(400);
        });
    });
});
describe('product end points tests', () => {
    describe('index', () => {
        it('get all products without token', async () => {
            const res = await superApp.get('/product');
            expect(res.statusCode).toBe(200);
        });
    });
    describe('createOne[only for admins]', () => {
        it('create one successfully with admin token', async () => {
            const res = await superApp
                .post('/product-admin')
                .set('authorization', `Bearer ${adminUserToken}`)
                .send({
                    name: 'newproduc324',
                    price: '980',
                    category: categoryId
                });
            productId = res.body.data.id;
            expect(res.statusCode).toBe(201);
        });
        it('create one with normal user token must fail', async () => {
            const res = await superApp
                .post('/product-admin')
                .set('authorization', `Bearer ${normalUserToken}`)
                .send({
                    name: 'newproduc3242143',
                    price: '980',
                    category: categoryId
                });
            expect(res.statusCode).toBe(401);
        });
    });
    describe('show', () => {
        it('get one product with its id with any user token successfully', async () => {
            const res = await superApp
                .get(`/product/${productId}`)
                .set('authorization', `Bearer ${adminUserToken}`);
            expect(res.statusCode).toBe(200);
        });
    });
    describe('updateOne[only for admins]', () => {
        it('update product with its id but not complete req body must fail', async () => {
            const res = await superApp
                .put(`/product-admin/${productId}`)
                .set('authorization', `Bearer ${adminUserToken}`);
            expect(res.statusCode).toBe(400);
        });
        it('update product with its id', async () => {
            const res = await superApp
                .put(`/product-admin/${productId}`)
                .send({
                    name: 'newproduc324xxxxx',
                    price: '980',
                    category: categoryId
                })
                .set('authorization', `Bearer ${adminUserToken}`);
            expect(res.statusCode).toBe(200);
        });
    });
    describe('deleteOne[only admins]', () => {
        it('delete product with its id', async () => {
            const res = await superApp
                .delete(`/product-admin/${productId}`)
                .set('authorization', `Bearer ${adminUserToken}`);
            expect(res.statusCode).toBe(200);
        });
        it('delete product with non exist id must fail ', async () => {
            let res = await superApp
                .delete(`/product-admin/${productId}`)
                .set('authorization', `Bearer ${adminUserToken}`);
            expect(res.statusCode).toBe(400);
            res = await superApp
                .post('/product-admin')
                .set('authorization', `Bearer ${adminUserToken}`)
                .send({
                    name: 'newproduc324',
                    price: '980',
                    category: categoryId
                });
            productId = res.body.data.id;
        });
    });
});
