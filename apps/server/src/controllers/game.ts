import { Request, Response } from "express";
import {
  CreateGameRoomRequest,
  MESSAGES,
  PlayerActionRequest,
  PlayerAttackTurnRequest,
  PlayerDefenseTurnRequest,
} from "../../../../packages/shared";
import { IdentifiedRequest } from "../middlewares";
import { GAME_ROOM_API } from "../api";
import { getGameForClient } from "../utils";

export const CREATE_GAME_ROOM = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { auth } = req as IdentifiedRequest;
    const { withOpenAI } = req.body as CreateGameRoomRequest;
    const game = await GAME_ROOM_API.createRoom(auth, withOpenAI);
    res.status(201).json({ game });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(409).json({ message: err.message });
    } else {
      res.status(500).json({ message: MESSAGES.GENERAL.UNKNOWN_ERROR });
    }
  }
};

export const GET_GAME_ROOM = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { auth } = req as IdentifiedRequest;
    const id = req.params.id;
    const playerId = auth.isAuth ? auth.userId : auth.guestId;
    const game = await getGameForClient(id, playerId);
    res.status(201).json({ game });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(409).json({ message: err.message });
    } else {
      res.status(500).json({ message: MESSAGES.GENERAL.UNKNOWN_ERROR });
    }
  }
};

export const PLAYER_TURN = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { auth } = req as IdentifiedRequest;
    const data = req.body as PlayerAttackTurnRequest | PlayerDefenseTurnRequest;
    const { playerAttack, playerDefense } = GAME_ROOM_API;
    const game =
      data.turn === "attack"
        ? await playerAttack(data as PlayerAttackTurnRequest, auth)
        : await playerDefense(data as PlayerDefenseTurnRequest, auth);
    res.status(201).json({ game });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(409).json({ message: err.message });
    } else {
      res.status(500).json({ message: MESSAGES.GENERAL.UNKNOWN_ERROR });
    }
  }
};

export const PLAYER_ACTION = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { auth } = req as IdentifiedRequest;
    const data = req.body as PlayerActionRequest;
    const { playerPassAction, playerTakeAction } = GAME_ROOM_API;
    const game =
      data.action === "take"
        ? await playerTakeAction(data, auth)
        : await playerPassAction(data, auth);
    res.status(201).json({ game });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(409).json({ message: err.message });
    } else {
      res.status(500).json({ message: MESSAGES.GENERAL.UNKNOWN_ERROR });
    }
  }
};

export const LEAVE_GAME = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { auth } = req as IdentifiedRequest;
    const id = req.params.id;
    await GAME_ROOM_API.leaveGame(id, auth);
    res.status(201).json({ message: "OK" });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(409).json({ message: err.message });
    } else {
      res.status(500).json({ message: MESSAGES.GENERAL.UNKNOWN_ERROR });
    }
  }
};
