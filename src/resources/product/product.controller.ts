import { ProductModel } from './product.model.js';
import { NextFunction, Request, Response } from 'express';
import { UserInReq } from 'src/utils/types.js';
const model = new ProductModel();
//category router routes
async function index(_req: Request, res: Response, next: NextFunction) {
    try {
        const products = await model.index();
        res.json({ data: products });
    } catch (err) {
        next(err);
    }
}
// id from req params
async function show(req: Request, res: Response, next: NextFunction) {
    try {
        const products = await model.show(req.params.id);
        res.json({ data: products });
    } catch (err) {
        next(err);
    }
}
//get the user id from req body through middle ware authProtect
async function createOne(req: UserInReq, res: Response, next: NextFunction) {
    try {
        if (!req.user) throw new Error('not authorized');
        if (!req.body.name || !req.body.price || !req.body.category)
            throw new Error(
                'must get name, price and category in the request body'
            );
        const products = await model.createOne(req.user.id, req.body);
        res.status(201).json({ data: products });
    } catch (err) {
        next(err);
    }
}
// get product id from req params
async function updateOne(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.body.name || !req.body.price || !req.body.category)
            throw new Error(
                'must get name, price and category in the request body'
            );
        const products = await model.updateOne(req.params.id, req.body);
        res.json({ data: products });
    } catch (err) {
        next(err);
    }
}
//get id from req params
async function deleteOne(req: Request, res: Response, next: NextFunction) {
    try {
        const products = await model.deleteOne(req.params.id);
        res.json({ data: products });
    } catch (err) {
        next(err);
    }
}
// get category id from req params as [catId]
async function productsByCategory(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const products = await model.productsByCategory(req.params.catId);
        res.json({ data: products });
    } catch (err) {
        next(err);
    }
}
async function popularProducts(
    _req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const products = await model.popularProducts();
        res.json({ data: products });
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
    productsByCategory,
    popularProducts
};
