import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './userModel';

interface IReview {
  user: IUser['_id'];
  rating: number;
  comment: string;
}

interface IReel {
  user: mongoose.Types.ObjectId;
  videoUrl: string;
  caption: string;
}

interface IPost {
  user: mongoose.Types.ObjectId;
  content: string;
  imageUrl?: string;
}

interface IProduct extends Document {
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  brand: string;
  ingredients: string[];
  skintype: string;
  size: string;
  coverage: string;
  finish: string;
  shade: string;
  notes: string[];
  occasion: string;
  images: string[];
  reviews: IReview[];
  reels: IReel[];
  posts: IPost[];
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: String, required: true },
  stock: { type: Number, required: true },
  brand: { type: String, required: true },
  ingredients: { type: [String], required: false },
  skintype: { type: String, required: false },
  coverage: { type: String, required: false },
  finish: { type: String, required: false },
  shade: { type: String, required: false },
  notes: { type: [String], required: false },
  occasion: { type: String, required: false },
  images: { type: [String], required: false },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        requierd: true,
      },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
    },
  ],
  reels: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      videoUrl: { type: String, required: true },
      description: { type: String, required: true },
    },
  ],
  posts: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      content: { type: String, required: true },
      imageUrl: { type: String, required: false },
    },
  ],
});

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;
