import { Game } from "../../../../../packages/shared";
import { AuthFromRequest } from "../../middlewares";
import { getGameForServer, setGame } from "../../utils";

export const leaveGame = async (id: string, auth: AuthFromRequest["auth"]) => {
  const game = await getGameForServer(id);
  const playerId = auth.isAuth ? auth.userId : auth.guestId;
  const players = game.players.list.map((player) => ({
    ...player,
    status: playerId === player.user._id ? "left" : player.status,
  }));
  // Todo
  const newGame: Game = {
    ...game,
    players: { ...game.players, list: players },
  };

  return await setGame(id, newGame, playerId);
};
