import { OrderModel } from './order.model.js';
import { NextFunction, Request, Response } from 'express';
import { UserInReq } from 'src/utils/types.js';
const model = new OrderModel();
//category router routes
async function index(_req: Request, res: Response, next: NextFunction) {
    try {
        const orders = await model.index();
        res.json({ data: orders });
    } catch (err) {
        next(err);
    }
}
async function show(req: Request, res: Response, next: NextFunction) {
    try {
        const orders = await model.show(req.params.id);
        res.json({ data: orders });
    } catch (err) {
        next(err);
    }
}
async function createOne(req: UserInReq, res: Response, next: NextFunction) {
    try {
        if (!req.user) throw new Error('not authorized');
        const orders = await model.createOne(req.user.id);
        res.json({ data: orders });
    } catch (err) {
        next(err);
    }
}
async function updateOne(req: Request, res: Response, next: NextFunction) {
    try {
        const orders = await model.updateOne(req.params.id, req.body);
        res.json({ data: orders });
    } catch (err) {
        next(err);
    }
}
async function deleteOne(req: Request, res: Response, next: NextFunction) {
    try {
        const orders = await model.deleteOne(req.params.id);
        res.json({ data: orders });
    } catch (err) {
        next(err);
    }
}
async function addProductToOrder(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const orders = await model.addProductToOrder(
            req.params.orderid,
            req.body.productid,
            req.body.quantity
        );
        res.json({ data: orders });
    } catch (err) {
        next(err);
    }
}
async function completedOrders(
    req: UserInReq,
    res: Response,
    next: NextFunction
) {
    try {
        if (!req.user) throw new Error('not authorized');
        const orders = await model.completedOrders(req.user.id);
        res.json({ data: orders });
    } catch (err) {
        next(err);
    }
}
export default {
    index,
    show,
    createOne,
    updateOne,
    deleteOne,
    addProductToOrder,
    completedOrders
};
