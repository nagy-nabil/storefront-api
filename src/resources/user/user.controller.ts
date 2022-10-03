import { UserModel } from './user.model.js';
import { NextFunction, Request, Response } from 'express';
const model = new UserModel();
//user router controllers
async function signUp(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        if (
            !req.body.firstname ||
            !req.body.lastname ||
            !req.body.email ||
            !req.body.password
        )
            throw new Error(
                'must get firstname, lastname, email and password in the request body'
            );
        const token = await model.signUp(req.body);
        res.status(201).json({ token: token });
    } catch (err) {
        next(err);
    }
}
async function signIn(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        if (!req.body.password || !req.body.email)
            throw new Error('must get email and password in the request body');
        const token = await model.signIn(req.body);
        res.status(201).json({ token: token });
    } catch (err) {
        next(err);
    }
}
async function indexAdmins(
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const users = await model.indexAdmins();
        res.json({ data: users });
    } catch (err) {
        next(err);
    }
}
async function createAdmin(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        if (
            !req.body.firstname ||
            !req.body.lastname ||
            !req.body.email ||
            !req.body.password
        )
            throw new Error(
                'must get firstname, lastname, email and password in the request body'
            );
        const token = await model.createAdmin(req.body);
        res.status(201).json({ token: token });
    } catch (err) {
        next(err);
    }
}
export default {
    signUp,
    signIn,
    indexAdmins,
    createAdmin
};
