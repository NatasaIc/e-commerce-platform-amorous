import express from 'express';
import { orderController } from '../controllers/orderController';
import protect, { admin } from '../middleware/authMiddleware';

// ROUTES
const router = express.Router();

router
  .route('/')
  .post(protect, orderController.createOrder)
  .get(protect, admin, orderController.getAllOrders);
export default router;
