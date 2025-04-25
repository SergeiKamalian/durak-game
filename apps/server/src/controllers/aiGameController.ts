import { Request, Response } from "express";
import {
  ERROR_MESSAGES,
  GameTurnAction,
  MESSAGES,
} from "../../../../packages/shared";
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
      res.status(500).json({ message: MESSAGES.GENERAL.UNKNOWN_ERROR });
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
      res.status(500).json({ message: MESSAGES.GENERAL.UNKNOWN_ERROR });
    }
  }
};

export const aiTurn = async (req: Request, res: Response): Promise<void> => {
  try {
    const { isAttacking } = req.body;

    // Guest id validation
    const guestId = req.headers["guestid"];
    if (!guestId || typeof guestId !== "string") {
      res
        .status(400)
        .json({ message: MESSAGES.CREATING_AI_GAME.GUEST_ID_ERROR });
      return;
    }
    // Get prev game
    const gameRes = await gameService.getAIGameRoom(guestId);
    let updatedGameRes = gameRes;
    let aiAction = null;

    if (gameRes) {
      const action = await gameService.aiTurn(gameRes, guestId, isAttacking);
      aiAction = action;
      const updatedGame = await gameService.getAIGameRoom(guestId);
      updatedGameRes = updatedGame;
    }

    res
      .status(201)
      .json({ action: aiAction as GameTurnAction, game: updatedGameRes });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(409).json({ message: err.message });
    } else {
      res.status(500).json({ message: MESSAGES.GENERAL.UNKNOWN_ERROR });
    }
  }
};

export const beatCard = async (req: Request, res: Response): Promise<void> => {
  try {
    const guestId = req.headers["guestid"];
    if (!guestId || typeof guestId !== "string") {
      res
        .status(400)
        .json({ message: MESSAGES.CREATING_AI_GAME.GUEST_ID_ERROR });
      return;
    }
    const gameRes = await gameService.getAIGameRoom(guestId);

    const { attackingCardId, defendingCardId, trump } = req.body;

    if (gameRes?.turnPlayerId !== guestId)
      throw new Error(MESSAGES.GAME.NOT_YOUR_TURN);
    let newGame = gameRes;

    if (gameRes) {
      await gameService.beatCard(
        attackingCardId,
        defendingCardId,
        gameRes,
        guestId
      );

      const updatedGame = await gameService.getAIGameRoom(guestId);
      if (updatedGame) {
        newGame = updatedGame;
      }
    }
    res.status(201).json(newGame);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(409).json({ message: err.message });
    } else {
      res.status(500).json({ message: MESSAGES.GENERAL.UNKNOWN_ERROR });
    }
  }
};

export const attackCard = async (
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

    const { attackingCardId } = req.body;

    if (gameRes?.turnPlayerId !== guestId)
      throw new Error(MESSAGES.GAME.NOT_YOUR_TURN);
    let newGame = gameRes;

    if (gameRes) {
      await gameService.attackCard(attackingCardId, guestId, gameRes);
      const updatedGame = await gameService.getAIGameRoom(guestId);
      if (updatedGame) newGame = updatedGame;
    }
    res.status(201).json({ action: "move" as GameTurnAction, game: newGame });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(409).json({ message: err.message });
    } else {
      res.status(500).json({ message: MESSAGES.GENERAL.UNKNOWN_ERROR });
    }
  }
};

export const playerAction = async (
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
    const { action: actionFromBody } = req.body;
    const action = actionFromBody as "pass" | "take";
    let newGame = gameRes;
    if (gameRes) {
      await gameService.turnAction(gameRes, action, guestId);
      const updatedGame = await gameService.getAIGameRoom(guestId);
      if (updatedGame) newGame = updatedGame;
    }

    res.status(201).json(newGame);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(409).json({ message: err.message });
    } else {
      res.status(500).json({ message: MESSAGES.GENERAL.UNKNOWN_ERROR });
    }
  }
};
