import userController from './user.controller.js';
import { Router } from 'express';
//! same as products two diffrenet privileges for the same model so create two routers
const userRouter = Router();
const userRouterAdmin = Router();
//asign controllers to the end points
// normal user
userRouter.post('/signup', userController.signUp);
userRouter.post('/signin', userController.signIn);
// [admins]
userRouterAdmin
    .route('/')
    .get(userController.index)
    .post(userController.createAdmin);
export { userRouter, userRouterAdmin };
