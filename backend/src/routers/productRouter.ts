import express from 'express';
import { productController } from '../controllers/productController';
import { protect, admin } from '../middleware/authMiddleware';

// ROUTES
const router = express.Router();
router
  .route('/')
  .get(productController.getAllProducts)
  .post(protect, admin, productController.createProduct);

router
  .route('/:id')
  .get(productController.getProductById)
  .patch(protect, admin, productController.updateProduct)
  .delete(protect, admin, productController.deleteProduct);

router.route('/:id/revews').post();

export default router;
