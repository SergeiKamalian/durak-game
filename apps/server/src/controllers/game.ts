import { Request, Response } from "express";
import { MESSAGES } from "../../../../packages/shared";
import { AuthFromRequest, IdentifiedRequest } from "../middlewares";
import { GAME_ROOM_API } from "../api";

export const CREATE_GAME_ROOM = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { auth } = req as IdentifiedRequest;
    const { withOpenAI } = req.body;
    const game = await GAME_ROOM_API.CREATING.createRoom(auth, withOpenAI);
    res.status(201).json({ game });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(409).json({ message: err.message });
    } else {
      res.status(500).json({ message: MESSAGES.GENERAL.UNKNOWN_ERROR });
    }
  }
};
