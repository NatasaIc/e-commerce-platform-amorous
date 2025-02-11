import User from './userModel';
declare namespace Express {
  interface Request {
    user?: User;
  }
}
