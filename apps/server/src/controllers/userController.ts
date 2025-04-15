import { Request, Response } from "express";
import { userService, authService } from "../services";
import {
  ERROR_MESSAGES,
  MESSAGES,
  SUCCESS_MESSAGES,
} from "../../../../packages/shared";
import { UserModel } from "../database/model";

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, password } = req.body;
    const existingUser = await UserModel.findOne({ name });
    if (existingUser) {
      res.status(409).json({ message: MESSAGES.REGISTRATION.COLUMN_CONFLICT });
      return;
    }
    await userService.createUser(name, password);
    const { accessToken, refreshToken, user } = await authService.login(
      name,
      password
    );
    res.status(201).json({
      message: MESSAGES.REGISTRATION.SUCCESS,
      user,
      refreshToken,
      accessToken,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(409).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, password } = req.body;
    const { accessToken, refreshToken, user } = await authService.login(
      name,
      password
    );
    res.status(200).json({
      message: MESSAGES.LOGIN.SUCCESS,
      accessToken,
      refreshToken,
      user,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const whoami = async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    const foundUser = await authService.whoami(token);
    res.status(200).json(foundUser);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const refreshToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { refreshToken } = req.body;
    const newAccessToken = await authService.refreshToken(refreshToken);
    res.status(200).json({ accessToken: newAccessToken });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(401).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const logoutUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.status(200).json({ message: SUCCESS_MESSAGES.USER_SUCCESSFULLY_LOG_OUT });
};
