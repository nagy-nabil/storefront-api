import App from './server.js';
import { initDbWithAdminCB } from './resources/user/user.model.js';
function main(): void {
    try {
        initDbWithAdminCB((err: Error) => {
            if (err) throw err;
        });
        const port = process.env.PORT || 3000;
        App.listen(port, () => {
            console.log(`listening on ${port}`);
        });
    } catch (err) {
        console.log(`couldn't create the server with the error ${err}`);
        throw err;
    }
}
main();
