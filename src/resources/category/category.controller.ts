import { CategoryModel } from './category.model.js';
import { NextFunction, Request, Response } from 'express';
import { UserInReq } from 'src/utils/types.js';
const model = new CategoryModel();
//category router routes
async function index(
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const categories = await model.index();
        res.json({ data: categories });
    } catch (err) {
        next(err);
    }
}
async function show(req: Request, res: Response, next: NextFunction) {
    try {
        const categories = await model.show(req.params.id);
        res.json({ data: categories });
    } catch (err) {
        next(err);
    }
}
async function createOne(req: UserInReq, res: Response, next: NextFunction) {
    try {
        if (!req.user) throw new Error('not authorized');
        if (!req.body.name || !req.body.description)
            throw new Error('must get name, description in the request body');
        const categories = await model.createOne(req.user.id, req.body);
        res.status(201).json({ data: categories });
    } catch (err) {
        next(err);
    }
}
async function updateOne(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.body.name || !req.body.description)
            throw new Error('must get name, description in the request body');
        const categories = await model.updateOne(req.params.id, req.body);
        res.json({ data: categories });
    } catch (err) {
        next(err);
    }
}
async function deleteOne(req: Request, res: Response, next: NextFunction) {
    try {
        const categories = await model.deleteOne(req.params.id);
        res.json({ data: categories });
    } catch (err) {
        next(err);
    }
}
export default {
    index,
    show,
    createOne,
    updateOne,
    deleteOne
};
