import {
  Game,
  MESSAGES,
  Player,
  PlayerAttackTurnRequest,
  PlayerDefenseTurnRequest,
  TableCards,
} from "../../../../../packages/shared";
import { AuthFromRequest } from "../../middlewares";
import {
  getGameForServer,
  setGame,
  tryAttackCard,
  tryCloseCard,
} from "../../utils";

export const playerAttack = async (
  data: PlayerAttackTurnRequest,
  auth: AuthFromRequest["auth"]
) => {
  const { id, cardId } = data;
  const playerId = auth.isAuth ? auth.userId : auth.guestId;
  const foundGame = await getGameForServer(id);
  const canAttack = tryAttackCard(cardId, foundGame.table.cards);
  if (!canAttack) throw new Error(MESSAGES.GAME.CHEATING);
  const table = [...foundGame.table.cards, [cardId]] as TableCards;
  const players = filterPlayersOnTurn(foundGame.players.list, playerId, cardId);
  const game: Game = {
    ...foundGame,
    table: { ...foundGame.table, cards: table },
    players: { ...foundGame.players, list: players },
  };
  return await setGame(id, game, playerId);
};

export const playerDefense = async (
  data: PlayerDefenseTurnRequest,
  auth: AuthFromRequest["auth"]
) => {
  const { id, inTableCardId, playerCardId } = data;
  const playerId = auth.isAuth ? auth.userId : auth.guestId;
  const foundGame = await getGameForServer(id);
  const canClose = tryCloseCard(
    inTableCardId,
    playerCardId,
    foundGame.table.trump
  );
  if (!canClose) throw new Error(MESSAGES.GAME.CHEATING);

  const inTableCardIsValid = foundGame.table.cards.some(
    (cards) => cards[0] === inTableCardId
  );
  if (!inTableCardIsValid) throw new Error(MESSAGES.GAME.CHEATING);

  const table = foundGame.table.cards.map((cards) => {
    if (cards[0] !== inTableCardId) return cards;
    else return [inTableCardId, playerCardId];
  }) as TableCards;
  const players = filterPlayersOnTurn(
    foundGame.players.list,
    playerId,
    playerCardId
  );
  const game: Game = {
    ...foundGame,
    table: { ...foundGame.table, cards: table },
    players: { ...foundGame.players, list: players },
  };
  return await setGame(id, game, playerId);
};

const filterPlayersOnTurn = (
  players: Player[],
  currentPlayerId: string,
  cardId: number
) => {
  return players.map((player) => {
    const cardIds =
      player.user._id === currentPlayerId
        ? player.cardIds.filter((card) => card !== cardId)
        : player.cardIds;
    return {
      ...player,
      cardIds,
    };
  });
};
