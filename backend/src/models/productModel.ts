import mongoose, { Schema, Document } from 'mongoose';

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
  rating: number;
  coverage: string;
  finish: string;
  shade: string;
  notes: string[];
  occasion: string;
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
  rating: { type: Number, required: false },
  coverage: { type: String, required: false },
  finish: { type: String, required: false },
  shade: { type: String, required: false },
  notes: { type: [String], required: false },
  occasion: { type: String, required: false },
});

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;
