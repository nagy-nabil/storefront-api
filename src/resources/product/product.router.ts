import productController from './product.controller.js';
import { Router } from 'express';
//! because product routes have different privileges like any user could see all products but only admin could create new one we will use two routers one for normal user one for admins
//normal user
const productRouter = Router();
//admin
const productRouterAdmin = Router();
//asign controllers to the end points [normal user]
productRouter.route('/').get(productController.index);
productRouter.route('/:id').get(productController.show);
productRouter.get('/category/:catId', productController.productsByCategory);
//asign controllers to the end points [admin]
productRouterAdmin.get(
    '/dashboard/popular-products',
    productController.popularProducts
);
productRouterAdmin.route('/').post(productController.createOne);
productRouterAdmin
    .route('/:id')
    .put(productController.updateOne)
    .delete(productController.deleteOne);
export { productRouter, productRouterAdmin };
