import Request from 'supertest';
import App from '../server.js';
const superApp = Request(App);
describe('server running', () => {
    it('main end point "/"', async (): Promise<void> => {
        const res = await superApp.get('/');
        expect(res.statusCode).toBe(200);
        expect(res.text).toEqual(`we're in the store !`);
    });
});
