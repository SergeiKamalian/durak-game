import bcrypt from "bcryptjs";
import { queryDatabase } from "../database";
import {
  ALL_CARDS,
  ERROR_MESSAGES,
  Game,
  GamePlayersCount,
  Player,
  UserType,
} from "../../../../packages/shared";
import {
  REDIS_COLUMN_NAMES,
  TABLES_NAMES,
  USER_DEFAULT_PRIVATE_INFO,
} from "../constants";
import { UserModel } from "../database/model";
import { getGameTrump, getStartingPlayer, giveRandomCards } from "../utils";
import { AppRedis } from "../clients";

export const gameService = {
  createAIGameRoom: async (guestId: string): Promise<Game> => {
    const allCardsIds = ALL_CARDS.map(({ id }) => id);

    const { updatedCurrentCardsIds: playerCardsIds, updatedDeckCardsIds } =
      giveRandomCards(allCardsIds, []);
    const {
      updatedCurrentCardsIds: openAICardsIds,
      updatedDeckCardsIds: remainingDeckCardsIds,
    } = giveRandomCards(updatedDeckCardsIds, []);

    const { gameTrump, updatedDeckIds: finishDeckIds } = getGameTrump(
      remainingDeckCardsIds
    );

    const openAIPlayer: Player = {
      user: {
        createdAt: new Date(),
        updatedAt: new Date(),
        name: "OpenAI",
        _id: "OpenAI",
      },
      status: "active",
      cardIds: openAICardsIds,
    };

    const guestPlayer: Player = {
      user: {
        createdAt: new Date(),
        updatedAt: new Date(),
        name: "Guest",
        _id: guestId,
      },
      status: "connecting",
      cardIds: playerCardsIds,
    };

    const players = [guestPlayer, openAIPlayer];
    const startingPlayer = getStartingPlayer(gameTrump, players);
    const startingIndex = players.findIndex(
      (p) => p.user._id === startingPlayer.user._id
    );
    const defenderPlayer = players[(startingIndex + 1) % players.length];

    const game: Game = {
      withOpenAI: true,
      isPrivate: false,
      id: guestId,
      deck: finishDeckIds,
      trump: gameTrump,
      attackingPlayerId: startingPlayer.user._id,
      defendingPlayerId: defenderPlayer.user._id,
      isTurnAttacker: true,
      players,
      playersCount: 2,
      table: [],
      turnMaxTime: null,
      status: "starting",
    };

    const redisColumnName = `${REDIS_COLUMN_NAMES.AI_GAME}:${guestId}`;
    await AppRedis.set(redisColumnName, JSON.stringify(game));

    return game;
  },

  createGameRoom: async (
    withOpenAI: boolean,
    isPrivate: boolean,
    playersCount: GamePlayersCount
  ) => {
    console.log("Coming soon...");
    return null;
  },
};
