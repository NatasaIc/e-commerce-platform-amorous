import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import asyncHandler from './asyncHandler';

interface JwtPayload {
  id: string;
}

const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        req.user = user;
        next();
      } catch (error) {
        res.status(401).json({ message: 'Not authorized, invalid token' });
      }
    }
  }
);

module.exports = {
  protect,
};
