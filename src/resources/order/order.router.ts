import orderController from './order.controller.js';
import { Router } from 'express';
const orderRouter = Router();
//asign controllers to the end points
orderRouter
    .route('/')
    .get(orderController.index)
    .post(orderController.createOne);
orderRouter.get('/completedorders', orderController.completedOrders);
orderRouter.get('/activeorder', orderController.userActiveOrder);
orderRouter.get('/orderproducts', orderController.orderWithProducts);
orderRouter
    .route('/:id')
    .get(orderController.show)
    .put(orderController.updateOne)
    .delete(orderController.deleteOne);
orderRouter.post('/addtoorder/:orderid', orderController.addProductToOrder);
export default orderRouter;
