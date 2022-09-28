import userController from './user.controller.js';
import { Router } from 'express';
const userRouter = Router();
//asign controllers to the end points
userRouter.post('/signup', userController.signUp);
userRouter.post('/signin', userController.signIn);
userRouter
    .route('/admins')
    .get(userController.index)
    .post(userController.createAdmin);
export default userRouter;
