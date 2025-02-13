import { Request, Response } from 'express';
import Order from '../models/orderModel';
import asyncHandler from '../middleware/asyncHandler';

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req: Request, res: Response) => {
  console.log(req.user);
  const { products, shippingAdress, paymentMethod } = req.body;

  if (!products || !shippingAdress || !paymentMethod) {
    res.status(400).json({ message: 'Please provide all order details.' });
    return;
  }
  // Calculate total price of the order
  const totalPrice = products.reduce(
    (acc: number, item: { price: number; quantity: number }) =>
      acc + item.price * item.quantity,
    0
  );
  const order = new Order({
    user: req.user?._id,
    products,
    shippingAdress,
    paymentMethod,
    totalPrice,
  });

  await order.save();
  res.status(201).json(order);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private
const getAllOrders = asyncHandler(async (req: Request, res: Response) => {
  const orders = await Order.find().populate('user', 'name email');
  res.json(orders);
});

export const orderController = {
  createOrder,
  getAllOrders,
};
