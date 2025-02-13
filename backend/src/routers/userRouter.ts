import express from 'express';
import { userController } from '../controllers/userController';
import { protect, admin } from '../middleware/authMiddleware';

// ROUTES
const router = express.Router();

router
  .route('/')
  .get(protect, admin, userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(protect, admin, userController.getUserById)
  .patch(protect, admin, userController.updateUser)
  .delete(protect, admin, userController.deleteUser);

export default router;
