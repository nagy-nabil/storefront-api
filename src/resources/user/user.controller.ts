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
        const token = await model.signUp(req.body);
        res.json({ token: token });
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
        const token = await model.signIn(req.body);
        res.json({ token: token });
    } catch (err) {
        next(err);
    }
}
export default {
    signUp,
    signIn
};
