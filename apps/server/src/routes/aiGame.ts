import express from "express";
import {
  createAIGameRoom,
  getAIGameRoom,
  aiTurn,
  beatCard,
  attackCard,
  playerAction,
} from "../controllers";

const AIGameRoute = express.Router();

AIGameRoute.post("/create-room", createAIGameRoom);
AIGameRoute.get("/get-room", getAIGameRoom);
AIGameRoute.post("/ai-turn", aiTurn);
AIGameRoute.post("/beat-card", beatCard);
AIGameRoute.post("/attack-card", attackCard);
AIGameRoute.post("/player-action", playerAction);

export { AIGameRoute };
