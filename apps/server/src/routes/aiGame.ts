import express from "express";
import { createAIGameRoom, getAIGameRoom } from "../controllers";

const AIGameRoute = express.Router();

AIGameRoute.post("/create-room", createAIGameRoom);
AIGameRoute.get("/get-room", getAIGameRoom);

export { AIGameRoute };
