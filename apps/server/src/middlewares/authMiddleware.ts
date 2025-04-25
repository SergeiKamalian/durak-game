import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ERROR_MESSAGES, MESSAGES } from "../../../../packages/shared";

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

type AuthProps = {
  auth: {
    isAuth: true;
    userId: string;
  };
};

type GuestProps = {
  auth: {
    isAuth: false;
    guestId: string;
  };
};
export type AuthFromRequest = AuthProps | GuestProps;
export type IdentifiedRequest = Request & AuthFromRequest;

export const identifyUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (token) {
    jwt.verify(token, ACCESS_SECRET, (err, decoded) => {
      if (err || !decoded || typeof decoded !== "object" || !decoded.userId) {
        res.status(401).json({ message: ERROR_MESSAGES.ACCESS_TOKEN_INVALID });
        return;
      }

      // @ts-ignore
      req.auth = {
        isAuth: true,
        userId: decoded.userId,
      };
      next();
    });
  } else {
    const guestId = req.headers["guestid"];
    if (!guestId) {
      res.status(401).json({ message: MESSAGES.GENERAL.GUEST_ID_INVALID });
      return;
    }
    // @ts-ignore
    req.auth = {
      isAuth: false,
      guestId,
    };
    next();
  }
};
