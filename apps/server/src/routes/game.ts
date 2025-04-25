import express from "express";
import { gameChecker, identifyUser } from "../middlewares";
import { CREATE_GAME_ROOM, PLAYER_TURN } from "../controllers";

const GAME_ROUTE = express.Router();

GAME_ROUTE.post("/create", identifyUser, CREATE_GAME_ROOM);
GAME_ROUTE.post("/:id/player-turn", gameChecker, PLAYER_TURN);

export { GAME_ROUTE };
