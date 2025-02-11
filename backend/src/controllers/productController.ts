import { Request, Response } from 'express';
import Product from '../models/productModel';
import asyncHandler from '../middleware/asyncHandler';

// @desc   GET all products
// @route  GET /api/products
// @access Public
const getAllProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await Product.find();
  res.json(products);
});

// @desc    GET product by ID
// @route   GET /api/products/:id
// @access  Private/admin
const getProductById = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.status(200).json(product);
  }
);

// @desc    Create a product
// @route   POST /api/products
// @access  Private/admin
const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.status(201).json(newProduct);
});

// @desc    Update a product
// @route   PATCH /api/products/:id
// @access  Private/admin
const updateProduct = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!product) {
      res.status(404).json({ message: 'Product not found ' });
      return;
    }
    res.json(product);
  }
);

// @desc    Remove a product
// @route   Delete /api/products/:id
// @access  Private/admin
const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    res.status(404).json({ message: 'Product not found' });
    return;
  }
  res.json({ message: 'Product deleted successfully' });
});

export const productController = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
