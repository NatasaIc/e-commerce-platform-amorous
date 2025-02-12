//Application logic (middleware, routes, etc.)
import express, { Request, Response, NextFunction } from 'express';
import productRouter from './routers/productRouter';
import userRouter from './routers/userRouter';
import orderRouter from './routers/orderRouter';

export const app = express();

app.use(express.json());

app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Typescript with express');
});
