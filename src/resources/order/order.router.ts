import orderController from './order.controller.js';
import { Router } from 'express';
const orderRouter = Router();
//asign controllers to the end points
orderRouter
    .route('/')
    .get(orderController.index)
    .post(orderController.createOne);
orderRouter
    .route('/:id')
    .get(orderController.show)
    .put(orderController.updateOne)
    .delete(orderController.deleteOne);
export default orderRouter;
