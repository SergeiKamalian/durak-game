import {
  Game,
  GameReturnType,
  PlayerReturnType,
} from "../../../../../packages/shared";
import { AppRedis } from "../../clients";
import { REDIS_COLUMN_NAMES } from "../../constants";

export const getGameForClient = async (
  id: string,
  currentPlayerId: string
): Promise<GameReturnType> => {
  const redisColumnName = `${REDIS_COLUMN_NAMES.GAME}:${id}`;
  const gameJson = await AppRedis.get(redisColumnName);
  const game = JSON.parse(gameJson!) as Game;
  const { players, deck, ...gameRest } = game;
  const returnPlayers: PlayerReturnType[] = players
    .filter(({ user }) => user._id !== currentPlayerId)
    .map((player) => {
      const { cardIds, ...restPlayer } = player;
      return {
        ...restPlayer,
        cardsCount: cardIds.length,
      };
    });
  const currentPlayer = players.find(
    ({ user }) => user._id === currentPlayerId
  )!;
  return {
    ...gameRest,
    deckCardsCount: deck.length,
    players: returnPlayers,
    currentPlayer,
  };
};

export const getGameForServer = async (id: string): Promise<Game> => {
  const redisColumnName = `${REDIS_COLUMN_NAMES.GAME}:${id}`;
  const gameJson = await AppRedis.get(redisColumnName);
  return JSON.parse(gameJson!) as Game;
};

export const setGame = async (
  id: string,
  game: Game,
  currentPlayerId: string
): Promise<GameReturnType> => {
  const redisColumnName = `${REDIS_COLUMN_NAMES.GAME}:${id}`;
  await AppRedis.set(redisColumnName, JSON.stringify(game));
  const gameRes = await getGameForClient(id, currentPlayerId);
  return gameRes;
};
