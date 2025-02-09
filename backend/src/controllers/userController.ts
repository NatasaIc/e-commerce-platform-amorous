import { Request, Response } from 'express';
import User from '../models/userModel';

// @desc   GET all users
// @route  GET /api/users
// @access Public
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const getUserById = async (req: Request, res: Response) => {};

const createUser = async (req: Request, res: Response) => {};

const updateUser = async (req: Request, res: Response) => {};

const deleteUser = async (req: Request, res: Response) => {};

export const userController = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
