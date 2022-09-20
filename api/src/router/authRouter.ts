import { Router } from 'express';
import { AuthController } from '@/controllers/AuthController';
import { validateFields, validateToken } from '@/utils/validation';

export const authRouter = Router();

authRouter.get('/', validateToken);
authRouter.post(
  '/login',
  validateFields(['email', 'password']),
  AuthController.login
);
