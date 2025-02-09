import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import Product from '../models/productModel';
import { productData } from './productData';

dotenv.config({ path: path.resolve(__dirname, '../../../config.env') });

const seedDB = async () => {
  try {
    console.log('Starting database connection...');
    const dbURI = process.env.DATABASE?.replace(
      '<PASSWORD>',
      process.env.DATABASE_PASSWORD || ''
    );

    if (!dbURI) {
      throw new Error('Database URI is missing!');
    }

    await mongoose.connect(dbURI);
    console.log('Connected to MongoDB successfully!');

    console.log('Deleting existing products...');
    await Product.deleteMany();
    console.log('Products deleted successfully!');

    console.log('Inserting new products...');
    await Product.insertMany(productData);
    console.log('Product data inserted successfully!');
  } catch (error) {
    console.error('Error connecting to db:', error);
    process.exit(1); // Exit the process if connection fails
  }
};

const deleteData = async () => {
  try {
    await Product.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// Command line argument handling for import or delete
if (process.argv[2] === '--import') {
  seedDB();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
