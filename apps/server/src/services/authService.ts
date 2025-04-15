import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { queryDatabase } from "../database";
import { generateAccessToken, generateRefreshToken } from "../utils";
import { ERROR_MESSAGES, UserType } from "../../../../packages/shared";
import { TABLES_NAMES } from "../constants";
import { UserModel } from "../database/model";

export const authService = {
  login: async (name: string, password: string) => {
    const user = await UserModel.findOne({ name });
    if (!user) {
      throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }
    const accessToken = generateAccessToken(String(user._id));
    const refreshToken = generateRefreshToken(String(user._id));
    const createdUser = await UserModel.findOne({ name }).select([
      "name",
      "createdAt",
      "updatedAt",
    ]);
    return { accessToken, refreshToken, user: createdUser };
  },

  refreshToken: (token: string) => {
    const REFRESH_SECRET = process.env.REFRESH_SECRET as string;
    return new Promise<string>((resolve, reject) => {
      jwt.verify(token, REFRESH_SECRET, (err, decoded) => {
        if (err || !decoded) {
          reject(new Error(ERROR_MESSAGES.INVALID_REFRESH_TOKEN));
        } else {
          // @ts-ignore
          resolve(generateAccessToken(decoded.userId));
        }
      });
    });
  },

  whoami: async (token?: string) => {
    const ACCESS_SECRET = process.env.ACCESS_SECRET as string;
    if (!token) {
      throw new Error(ERROR_MESSAGES.UNAUTHORIZED);
    }
    const decoded = jwt.verify(token, ACCESS_SECRET) as { userId: string };
    if (!decoded || !decoded.userId) {
      throw new Error(ERROR_MESSAGES.ACCESS_TOKEN_INVALID);
    }
    const user = await UserModel.findOne({ _id: decoded.userId }).select([
      "name",
      "createdAt",
      "updatedAt",
    ]);
    if (!user) {
      throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    }
    return user;
  },
};
