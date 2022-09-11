import { AuthController } from '@controllers/AuthController';
import { Router } from 'express';

export const authRouter = Router();

authRouter.post('/login', AuthController.login);
