import jwt from 'jsonwebtoken';
import { UserDoc, UserInReq, UserRole } from './types.js';
import { Response, NextFunction } from 'express';
/**
 * function create token from user doc
 * @param user UserDoc
 * @returns string
 */
export function createJWT(user: UserDoc): string {
    if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRES)
        throw new Error('env file error[no JWT_SECRET OR JWT_EXPIRES]');
    const token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES
    });
    return token;
}
export function verifyJWT(token: string): UserDoc {
    if (!process.env.JWT_SECRET)
        throw new Error('env file error[no JWT_SECRET]');
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return payload as UserDoc;
}
export function authProtect(
    req: UserInReq,
    _res: Response,
    next: NextFunction
) {
    try {
        const auth = req.headers.authorization;
        if (!auth) throw new Error('no token');
        //get the token after Bearer
        const token = auth.split(' ')[1];
        const payload = verifyJWT(token);
        if (!payload.role || !payload.id) throw new Error('invaild token');
        req.user = payload;
        next();
    } catch (err) {
        next(new Error(`not authorized ${err}`));
    }
}
export function isAdmin(req: UserInReq, _res: Response, next: NextFunction) {
    try {
        if (!req.user) throw new Error('request with no user');
        if (req.user.role !== UserRole.ADMIN)
            throw new Error('action for admins only');
        next();
    } catch (err) {
        next(new Error(`not authorized ${err}`));
    }
}
