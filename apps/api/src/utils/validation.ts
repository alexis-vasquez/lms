import { CONFIG } from "../config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";

export const validateFields = (fields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const missingFields = fields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      res
        .status(400)
        .json({ error: `Missing fields: ${missingFields.join(", ")}` });
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
      return res.status(401).json({ error: "Missing token" });
    }
    jwt.verify(token, CONFIG.JWT_SECRET);
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
  return next();
};

export const validatePrivileges = (
  privilegeRequired: string,
  userprivileges: string[]
) => {
  if (
    !userprivileges.includes(privilegeRequired) &&
    !userprivileges.includes("ALL_PRIVILEGES")
  ) {
    throw new GraphQLError("You don't have the required privileges");
  }
};
