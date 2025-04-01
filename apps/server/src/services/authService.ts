import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { queryDatabase } from "../database";
import { generateAccessToken, generateRefreshToken } from "../utils";
import { ERROR_MESSAGES, UserType } from "../../../../packages/shared";
import { TABLES_NAMES } from "../constants";

export const authService = {
  login: async (name: string, password: string) => {
    const foundUserData = await queryDatabase<UserType>({
      method: "get",
      table: TABLES_NAMES.USERS,
      eq: ["name", name],
      limit: 1,
    });

    const { data, error } = foundUserData!;
    if (error) throw new Error(error.message);

    const user = data.length ? data[0] : null;

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }
    const accessToken = generateAccessToken(user.id!);
    const refreshToken = generateRefreshToken(user.id!);

    return { accessToken, refreshToken, user };
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
    const foundUserData = await queryDatabase<UserType>({
      method: "get",
      table: TABLES_NAMES.USERS,
      select: "id, name, updatedAt, createdAt",
      eq: ["id", decoded.userId],
      limit: 1,
    });
    const { data, error } = foundUserData!;
    if (error) throw new Error(error.message);

    const user = data.length ? data[0] : null;
    if (!user) {
      throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    }
    return user;
  },
};
