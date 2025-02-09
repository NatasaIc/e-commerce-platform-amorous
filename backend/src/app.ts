//Application logic (middleware, routes, etc.)
import express, { Request, Response } from 'express';
import productRouter from './routers/productRouter';

export const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Use product routes
app.use('/api/products', productRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Typescript with express');
});
