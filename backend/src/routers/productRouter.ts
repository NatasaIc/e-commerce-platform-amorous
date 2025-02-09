import express from 'express';
import { productController } from '../controllers/productController';

// ROUTES
const router = express.Router();
router
  .route('/')
  .get(productController.getAllProducts)
  .post(productController.createProduct);

router
  .route('/:id')
  .get(productController.getProductById)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

router.route('/:id/revews').post();

export default router;
