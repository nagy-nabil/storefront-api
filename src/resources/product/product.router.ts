import productController from './product.controller.js';
import { Router } from 'express';
const productRouter = Router();
//asign controllers to the end points
productRouter
    .route('/')
    .get(productController.index)
    .post(productController.createOne);
productRouter
    .route('/:id')
    .get(productController.show)
    .put(productController.updateOne)
    .delete(productController.deleteOne);
export default productRouter;
