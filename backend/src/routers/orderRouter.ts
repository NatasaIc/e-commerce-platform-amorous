import express from 'express';
import { orderController } from '../controllers/orderController';
import { protect, admin } from '../middleware/authMiddleware';

// ROUTES
const router = express.Router();

router
  .route('/')
  .post(protect, orderController.createOrder)
  .get(protect, admin, orderController.getAllOrders);

router.route('/myorders').get();
router.route('/:id').get();
router.route('/:id/pay').patch();
router.route('/:id/deliver').patch();
export default router;
