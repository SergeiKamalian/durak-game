import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ERROR_MESSAGES } from "../../../../packages/shared";

const ACCESS_SECRET = process.env.ACCESS_SECRET as string;

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: ERROR_MESSAGES.ACCESS_TOKEN_REQUIRED });
    return;
  }

  jwt.verify(token, ACCESS_SECRET, (err, decoded) => {
    if (err || !decoded || typeof decoded !== "object" || !decoded.userId) {
      res.status(401).json({ message: ERROR_MESSAGES.ACCESS_TOKEN_INVALID });
      return;
    }
    // @ts-ignore
    req.user = decoded;
    next();
  });
};
