import { NextFunction, Request, Response } from "express";
import { IdentifiedRequest, identifyUser } from "./authMiddleware";
import { MESSAGES } from "../../../../packages/shared";
import { getGameForServer } from "../utils";

export const gameChecker = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await new Promise<void>((resolve, reject) => {
    identifyUser(req, res, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

  const id = req.params.id;
  const foundGame = await getGameForServer(id);

  if (!foundGame) {
    res.status(404).json({ message: MESSAGES.GAME.GAME_NOT_FOUND });
    return;
  }

  const auth = (req as IdentifiedRequest).auth;
  const playerId = auth.isAuth ? auth.userId : auth.guestId;
  const hasAccessToGame = !!foundGame.players.list.some(
    ({ user }) => user._id === playerId
  );

  if (!hasAccessToGame) {
    res.status(403).json({ message: MESSAGES.GAME.ACCESS_DENIED_TO_ROOM });
    return;
  }

  next();
};
