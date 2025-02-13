import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';

dotenv.config({ path: path.resolve(__dirname, '../../../config.env') });

export const generateToken = (id: string | mongoose.Types.ObjectId) => {
  const stringId = id instanceof mongoose.Types.ObjectId ? id.toString() : id;
  return jwt.sign({ id: stringId }, process.env.JWT_SECRET || '', {
    expiresIn: '30d',
  });
};
