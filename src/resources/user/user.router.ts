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
userRouterAdmin.route('/').post(userController.createAdmin);
userRouterAdmin.route('/admins').get(userController.indexAdmins);
userRouterAdmin.route('/admins/:id').get(userController.showAdmin);
export { userRouter, userRouterAdmin };
