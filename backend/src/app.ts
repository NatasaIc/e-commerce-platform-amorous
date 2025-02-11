//Application logic (middleware, routes, etc.)
import express, { Request, Response } from 'express';
import productRouter from './routers/productRouter';
import userRouter from './routers/userRouter';

export const app = express();

app.use(express.json());

app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Typescript with express');
});
