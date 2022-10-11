import userController from './user.controller.js';
import { Router } from 'express';
//! using approach => having more than one router to be imported in the server where each router must be used with specific auth model[role]
// any user privilege router that does not need token
const userRouter = Router();
// any user privilege router that needs token like update password
const userRouterAuth = Router();
const userRouterAdmin = Router();
//asign controllers to the end points
// normal user
userRouter.post('/signup', userController.signUp);
userRouter.post('/signin', userController.signIn);
// any user but with token
userRouterAuth.post('/settings/password', userController.updatePass);
// [admins]
userRouterAdmin
    .route('/admins')
    .get(userController.indexAdmins)
    .post(userController.createAdmin);
userRouterAdmin.route('/admins/:id').get(userController.showAdmin);
export { userRouter, userRouterAdmin, userRouterAuth };
