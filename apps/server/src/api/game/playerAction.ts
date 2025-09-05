import {
  Game,
  MESSAGES,
  PlayerActionRequest,
} from "../../../../../packages/shared";
import { AuthFromRequest } from "../../middlewares";
import { getGameForServer, setGame } from "../../utils";

export const playerPassAction = async (
  data: PlayerActionRequest,
  auth: AuthFromRequest["auth"]
) => {
  const { id } = data;

  const playerId = auth.isAuth ? auth.userId : auth.guestId;
  const foundGame = await getGameForServer(id);

  const checkPlayerActiveStatus = foundGame.players.turnPlayerId === playerId;
  const checkPlayerAttackerStatus = foundGame.players.list.some(
    ({ user }) => user._id === playerId
  );
  const checkPlayerActionExisting = !!foundGame.turn.roundActions.find(
    (i) => i.playerId === playerId
  );
  const isCheating =
    !checkPlayerActiveStatus ||
    !checkPlayerAttackerStatus ||
    !checkPlayerActionExisting;

  if (isCheating) throw new Error(MESSAGES.GAME.CHEATING);

  const { turn, players } = foundGame;
  const game: Game = {
    ...foundGame,
    turn: {
      ...turn,
      roundActions: [...turn.roundActions, { action: "pass", playerId }],
    },
    players: {
      ...players,
    },
  };

  return await setGame(id, game, playerId);
};

export const playerTakeAction = async (
  data: PlayerActionRequest,
  auth: AuthFromRequest["auth"]
) => {
  const { id, action } = data;
  const playerAction = action as "take";
  const playerId = auth.isAuth ? auth.userId : auth.guestId;
  const foundGame = await getGameForServer(id);
  const game = { ...foundGame };
  return await setGame(id, game, playerId);
};
