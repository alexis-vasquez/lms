import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { validateFields, validateToken } from '../utils/validation';

export const authRouter = Router();

authRouter.get('/', validateToken, AuthController.authenticate);
authRouter.post(
  '/login',
  validateFields(['email', 'password']),
  AuthController.login
);
authRouter.post(
  '/register',
  validateFields(['email', 'password', 'firstName', 'lastName']),
  AuthController.register
);
