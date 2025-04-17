import express from "express";
import { createAIGameRoom, getGame } from "../controllers";

const AIGameRoute = express.Router();

AIGameRoute.post("/create-room", createAIGameRoom);
AIGameRoute.post("/get-room", getGame);

export { AIGameRoute };
