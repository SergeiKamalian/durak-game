import express from "express";
import { createAIGameRoom, getAIGameRoom, aiTurn } from "../controllers";

const AIGameRoute = express.Router();

AIGameRoute.post("/create-room", createAIGameRoom);
AIGameRoute.get("/get-room", getAIGameRoom);
AIGameRoute.post("/ai-turn", aiTurn);

export { AIGameRoute };
