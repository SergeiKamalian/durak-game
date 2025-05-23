import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.ACCESS_SECRET as string;
const REFRESH_SECRET = process.env.REFRESH_SECRET as string;

export const generateAccessToken = (userId: string | number) => {
  return jwt.sign({ userId }, ACCESS_SECRET, { expiresIn: "1d" });
};

export const generateSessionToken = (guestId: string) => {
  return jwt.sign({ guestId }, ACCESS_SECRET, { expiresIn: "1d" });
};

export const generateRefreshToken = (userId: string | number) => {
  return jwt.sign({ userId }, REFRESH_SECRET, { expiresIn: "7d" });
};
