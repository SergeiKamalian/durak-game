import express, { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { queryDatabase } from "../database";

import { authenticateToken } from "../middlewares";
import {
  createUser,
  loginUser,
  logoutUser,
  refreshToken,
  whoami,
} from "../controllers";
import { UserType } from "../../../../packages/shared";

const router = express.Router();

router.post("/create", createUser);
router.post("/login", loginUser);
router.post("/refresh", refreshToken);
router.post("/logout", logoutUser);
router.post("/whoami", authenticateToken, whoami);

router.get(
  "/",
  authenticateToken,
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const usersData = await queryDatabase<UserType>({
      method: "get",
      table: "users",
    });
    const { data, error } = usersData!;
    if (error) {
      throw new Error(error.message);
    }

    res.json({ users: data });
  })
);

export default router;
