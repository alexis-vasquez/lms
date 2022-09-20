import { NextFunction, Request, Response } from 'express';

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