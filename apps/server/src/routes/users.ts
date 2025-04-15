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
  sendFriendRequest,
  fetchFriendsInfo,
  handleFriendRequest,
} from "../controllers";
import { UserType } from "../../../../packages/shared";

import { TABLES_NAMES } from "../constants";

const router = express.Router();

router.post("/create", createUser);
router.post("/login", loginUser);
router.post("/refresh", refreshToken);

router.post("/logout", logoutUser);
router.post("/whoami", authenticateToken, whoami);
router.post("/friend-request", authenticateToken, sendFriendRequest);
router.get("/friends", authenticateToken, fetchFriendsInfo);
router.post("/friends/request-handle", authenticateToken, handleFriendRequest);

router.get(
  "/",
  authenticateToken,
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const usersData = await queryDatabase<UserType>({
      method: "get",
      table: TABLES_NAMES.USERS,
    });
    const { data, error } = usersData!;
    if (error) {
      throw new Error(error.message);
    }

    res.json({ users: data });
  })
);

export default router;
