import { OrderModel } from './order.model.js';
import { CartQuery } from '../../services/cart.js';
import { NextFunction, Request, Response } from 'express';
import { UserInReq } from 'src/utils/types.js';
const model = new OrderModel();
const cartModel = new CartQuery();
//category router routes
async function index(_req: Request, res: Response, next: NextFunction) {
    try {
        const orders = await model.index();
        res.json({ data: orders });
    } catch (err) {
        next(err);
    }
}
//get the order id from req params
async function show(req: Request, res: Response, next: NextFunction) {
    try {
        const orders = await model.show(req.params.id);
        res.json({ data: orders });
    } catch (err) {
        next(err);
    }
}
//get the user id from req attribuites through middle ware authProtect
async function createOne(req: UserInReq, res: Response, next: NextFunction) {
    try {
        if (!req.user) throw new Error('not authorized');
        const orders = await model.createOne(req.user.id);
        res.json({ data: orders });
    } catch (err) {
        next(err);
    }
}
//get order id from req params, order data from the req body
async function updateOne(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.body.status)
            throw new Error('must get order status in the request body');
        const orders = await model.updateOne(req.params.id, req.body);
        res.json({ data: orders });
    } catch (err) {
        next(err);
    }
}
//order id from req params
async function deleteOne(req: Request, res: Response, next: NextFunction) {
    try {
        const orders = await model.deleteOne(req.params.id);
        res.json({ data: orders });
    } catch (err) {
        next(err);
    }
}
//order id from req params, productid and quantity from req body
async function addProductToOrder(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        if (!req.body.quantity || !req.body.productid)
            throw new Error(
                'must get productid and quantity in the request body'
            );
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
//get the user id from req attribuites through middle ware authProtect
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
// cart model can be added to order controllers
//get user id from req attribuites through middle ware authProtect
async function userActiveOrder(
    req: UserInReq,
    res: Response,
    next: NextFunction
) {
    try {
        if (!req.user) throw new Error('not authorized');
        const orders = await cartModel.userActiveOrder(req.user.id);
        res.json({ data: orders });
    } catch (err) {
        next(err);
    }
}
//get user id from req attribuites through middle ware authProtect
async function orderWithProducts(
    req: UserInReq,
    res: Response,
    next: NextFunction
) {
    try {
        if (!req.user) throw new Error('not authorized');
        const orders = await cartModel.orderWithProducts(req.user.id);
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
    completedOrders,
    userActiveOrder,
    orderWithProducts
};
