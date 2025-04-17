import { Request, Response } from "express";
import { MESSAGES } from "../../../../packages/shared";
import { AppRedis } from "../clients";
import { REDIS_COLUMN_NAMES } from "../constants";
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
export const getGame = async (req: Request, res: Response): Promise<void> => {
  try {
    const guestId = req.headers["guestid"];

    if (!guestId || typeof guestId !== "string") {
      res
        .status(400)
        .json({ message: MESSAGES.CREATING_AI_GAME.GUEST_ID_ERROR });
      return;
    }
    const redisColumnName = `${REDIS_COLUMN_NAMES.AI_GAME}:${guestId}`;
    const resNew = await AppRedis.get(redisColumnName);

    if (!resNew) {
      res
        .status(400)
        .json({ message: MESSAGES.CREATING_AI_GAME.GUEST_ID_ERROR });
      return;
    }

    res.status(201).json({
      game: JSON.parse(resNew),
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(409).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Произошла неизвестная ошибка" });
    }
  }
};
