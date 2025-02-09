import { Request, Response } from 'express';
import Product from '../models/productModel';

// @desc   GET all products
// @route  GET /api/products
// @access Public
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// @desc    GET product by ID
// @route   GET /api/products/:id
// @access  Private/admin
const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/admin
const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// @desc    Update a product
// @route   PATCH /api/products/:id
// @access  Private/admin
const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Received update request for product ID:', req.params.id);

    // Start timer
    const startTime = Date.now();

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    const duration = Date.now() - startTime;
    console.log(`Product update took ${duration}ms`);

    if (!product) {
      res.status(404).json({ message: 'Product not found ' });
      return;
    }
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// @desc    Remove a product
// @route   Delete /api/products/:id
// @access  Private/admin
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

export const productController = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
