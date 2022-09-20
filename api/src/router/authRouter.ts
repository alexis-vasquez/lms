import { Router } from 'express';
import { AuthController } from '@/controllers/AuthController';
import { validateFields } from '@/utils/validation';

export const authRouter = Router();

authRouter.post(
  '/login',
  validateFields(['email', 'password']),
  AuthController.login
);
