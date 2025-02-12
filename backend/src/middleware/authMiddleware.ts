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
        token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET as string
        ) as JwtPayload;

        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
          res.status(401).json({ message: 'Not authorized, user not found' });
          return;
        }

        req.user = user;
        next();
      } catch (error) {
        res.status(401).json({ message: 'Not authorized, invalid token' });
      }
    }
  }
);

// Admin middleware
export const admin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};

export default protect;
