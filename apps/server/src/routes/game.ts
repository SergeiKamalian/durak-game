import express from "express";
import { gameChecker, identifyUser } from "../middlewares";
import {
  CREATE_GAME_ROOM,
  GET_GAME_ROOM,
  LEAVE_GAME,
  PLAYER_ACTION,
  PLAYER_TURN,
} from "../controllers";

const GAME_ROUTE = express.Router();

GAME_ROUTE.get("/:id", gameChecker, GET_GAME_ROOM);
GAME_ROUTE.post("/create", identifyUser, CREATE_GAME_ROOM);
GAME_ROUTE.post("/:id/player-turn", gameChecker, PLAYER_TURN);
GAME_ROUTE.post("/:id/player-action", gameChecker, PLAYER_ACTION);
GAME_ROUTE.post("/:id/leave", gameChecker, LEAVE_GAME);

export { GAME_ROUTE };
