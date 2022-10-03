import express from 'express';
import morgan from 'morgan';
import { userRouter, userRouterAdmin } from './resources/user/user.router.js';
import categoryRouter from './resources/category/category.router.js';
import orderRouter from './resources/order/order.router.js';
import {
    productRouter,
    productRouterAdmin
} from './resources/product/product.router.js';
import { authProtect, isAdmin } from './utils/auth.js';
const app = express();
// general middlewared
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
//end points [controllers/routers]
app.get('/', (_req: express.Request, res: express.Response) => {
    res.send(`we're in the store !`);
});
// no token required
app.use('/user', userRouter);
app.use('/product', productRouter);
// token required
// app.use(authProtect);
app.use('/order', [authProtect], orderRouter);
// only admins end points
// app.use(isAdmin);
app.use('/category', [authProtect, isAdmin], categoryRouter);
app.use('/product-admin', [authProtect, isAdmin], productRouterAdmin);
app.use('/user-admin', [authProtect, isAdmin], userRouterAdmin);
// app.use('/productAdmin', productRouterAdmin);
// app.use('/userAdmin', userRouterAdmin);
// catching errors and return custom message, and 404 pages
app.use(
    (
        err: Error,
        req: express.Request,
        res: express.Response,
        _next: express.NextFunction
    ) => {
        console.log(`new error in the url ${req.url}`, err.message);
        if (err.message.includes('env error'))
            res.status(500).json({
                error: 'server error please try again later'
            });
        else if (err.message.includes(`couldn't`))
            res.status(400).json({ error: err.message });
        else if (err.message.includes(`not authorized`))
            res.status(401).json({ error: err.message });
        else
            res.status(500).json({
                error: 'server error please try again later'
            });
    }
);
app.use(
    (
        _req: express.Request,
        res: express.Response,
        _next: express.NextFunction
    ) => {
        res.status(404).send('404 page');
    }
);
export default app;
