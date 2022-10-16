import { CONFIG } from '../config';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const validateFields = (fields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const missingFields = fields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      res
        .status(400)
        .json({ error: `Missing fields: ${missingFields.join(', ')}` });
      return;
    }
    next();
  };
};

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: 'Missing token' });
    }
    jwt.verify(token, CONFIG.JWT_SECRET);
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
  return next();
};
