import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import Product from '../models/productModel';
import { productData } from './productData';
import { userData } from './userData';
import User from '../models/userModel';

dotenv.config({ path: path.resolve(__dirname, '../../../config.env') });

const seedDB = async () => {
  try {
    const dbURI = process.env.DATABASE?.replace(
      '<PASSWORD>',
      process.env.DATABASE_PASSWORD || ''
    );

    if (!dbURI) {
      throw new Error('Database URI is missing!');
    }

    await mongoose.connect(dbURI);
    console.log('Connected to MongoDB successfully!');

    await Product.deleteMany();
    await User.deleteMany();

    const insertedProducts = await Product.insertMany(productData);
    console.log('Inserted products:', insertedProducts);

    const insertedUsers = await User.insertMany(userData);
    console.log('Inserted users:', insertedUsers);
  } catch (error) {
    console.error('Error connecting to db:', error);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// Command line argument handling for import or delete
if (process.argv[2] === '--delete') {
  deleteData();
} else if (process.argv[2] === '--import') {
  seedDB();
}
console.log(process.argv);
