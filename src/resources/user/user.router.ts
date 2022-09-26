import userController from './user.controller.js';
import { Router } from 'express';
const userRouter = Router();
//asign controllers to the end points
userRouter.post('/signup', userController.signUp);
userRouter.post('/signin', userController.signIn);
userRouter.get('/admins', userController.index);
export default userRouter;
