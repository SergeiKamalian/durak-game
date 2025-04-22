import bcrypt from "bcryptjs";
import { queryDatabase } from "../database";
import {
  ALL_CARDS,
  ERROR_MESSAGES,
  Game,
  GamePlayersCount,
  MESSAGES,
  OPEN_AI_PLAYER_ID,
  Player,
  UserType,
} from "../../../../packages/shared";
import {
  REDIS_COLUMN_NAMES,
  TABLES_NAMES,
  USER_DEFAULT_PRIVATE_INFO,
} from "../constants";
import { UserModel } from "../database/model";
import {
  generateTurnTime,
  getGameTrump,
  getStartingPlayer,
  giveRandomCards,
} from "../utils";
import { AppRedis } from "../clients";
import { getOpenaiAttackingMove, openai } from "../openai";

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
        name: OPEN_AI_PLAYER_ID,
        _id: OPEN_AI_PLAYER_ID,
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
      status: "active",
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
      playersCount: players.length as 2,
      table: [],
      turnMaxTime: generateTurnTime(),
      status: "active",
    };

    const redisColumnName = `${REDIS_COLUMN_NAMES.AI_GAME}:${guestId}`;
    await AppRedis.set(redisColumnName, JSON.stringify(game));

    return game;
  },

  getAIGameRoom: async (guestId: string): Promise<Game | null> => {
    const redisColumnName = `${REDIS_COLUMN_NAMES.AI_GAME}:${guestId}`;
    const gameJson = await AppRedis.get(redisColumnName);
    return gameJson ? JSON.parse(gameJson) : null;
  },

  aiTurn: async (game: Game): Promise<Game | null> => {
    const aiIsAttacker = game.attackingPlayerId === OPEN_AI_PLAYER_ID;
    if (aiIsAttacker) {
      const res = await getOpenaiAttackingMove(game);
    } else {
    }

    return null;
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
