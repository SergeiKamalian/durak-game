import express from "express";
import { authenticateToken } from "../middlewares";
import {
  createUser,
  loginUser,
  logoutUser,
  refreshToken,
  whoami,
} from "../controllers";

const usersRoute = express.Router();

usersRoute.post("/create", createUser);
usersRoute.post("/login", loginUser);
usersRoute.post("/refresh", refreshToken);
usersRoute.post("/logout", logoutUser);
usersRoute.post("/whoami", authenticateToken, whoami);

export { usersRoute };
