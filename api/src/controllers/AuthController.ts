import { RequestHandler } from 'express';

export class AuthController {
  static login: RequestHandler = (_req, res) => {
    res.json('login');
  };
}
