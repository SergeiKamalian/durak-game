import { Request, Response } from "express";
import { MESSAGES } from "../../../../packages/shared";
import { gameService } from "../services";

export const createAIGameRoom = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const guestId = req.headers["guestid"];
    if (!guestId || typeof guestId !== "string") {
      res
        .status(400)
        .json({ message: MESSAGES.CREATING_AI_GAME.GUEST_ID_ERROR });
      return;
    }
    const game = await gameService.createAIGameRoom(guestId);
    res.status(201).json(game);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(409).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Произошла неизвестная ошибка" });
    }
  }
};
export const getAIGameRoom = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const guestId = req.headers["guestid"];
    if (!guestId || typeof guestId !== "string") {
      res
        .status(400)
        .json({ message: MESSAGES.CREATING_AI_GAME.GUEST_ID_ERROR });
      return;
    }
    const gameRes = await gameService.getAIGameRoom(guestId);
    res.status(201).json({
      game: gameRes,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(409).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Произошла неизвестная ошибка" });
    }
  }
};
