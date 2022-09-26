import categoryController from './category.controller.js';
import { Router } from 'express';
const categoryRouter = Router();
//asign controllers to the end points
categoryRouter
    .route('/')
    .get(categoryController.index)
    .post(categoryController.createOne);
categoryRouter
    .route('/:id')
    .get(categoryController.show)
    .put(categoryController.updateOne)
    .delete(categoryController.deleteOne);
export default categoryRouter;
