import { Request, Response } from 'express';
import User from '../models/userModel';
import asyncHandler from '../middleware/asyncHandler';

// @desc   GET all users
// @route  GET /api/users
// @access Public
const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find();
  res.json(users);
});

// @desc    GET user by ID
// @route   GET /api/users/:id
// @access  Private/admin
const getUserById = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json(user);
  }
);

// @desc    Create a user
// @route   POST /api/users
// @access  Private/admin
const createUser = asyncHandler(async (req: Request, res: Response) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.status(201).json(newUser);
});

// @desc    Update a user
// @route   PATCH /api/users/:id
// @access  Private/admin
const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  res.status(200).json(user);
});

// @desc    Remove a user
// @route   Delete /api/users/:id
// @access  Private/admin
const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  res.json({ message: 'User deleted successfully' });
});

export const userController = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
