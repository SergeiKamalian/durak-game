import express from "express";
import { authenticateToken, identifyUser } from "../middlewares";
import { CREATE_GAME_ROOM } from "../controllers";

const GAME_ROUTE = express.Router();

GAME_ROUTE.post("/create", identifyUser, CREATE_GAME_ROOM);
// usersRoute.post("/login", loginUser);
// usersRoute.post("/refresh", refreshToken);
// usersRoute.post("/logout", logoutUser);
// usersRoute.post("/whoami", authenticateToken, whoami);

export { GAME_ROUTE };
