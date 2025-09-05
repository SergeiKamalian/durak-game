import bcrypt from "bcryptjs";
import { queryDatabase } from "../database";
import {
  ALL_CARDS,
  CardSuits,
  ERROR_MESSAGES,
  Game,
  GamePlayersCount,
  GameTurnAction,
  getCardById,
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
  getNewAttackerAndDefenderPlayerOnFinishGame,
  getStartingPlayer,
  giveRandomCards,
  tryAttackCard,
  tryBeatCard,
} from "../utils";
import { AppRedis } from "../clients";
import {
  getOpenaiAttackingMove,
  getOpenaiDefendingMove,
  openai,
} from "../openai";

export const gameService = {
  createAIGameRoom: async (guestId: string) => {
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
      index: 0,
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
      index: 1,
    };

    const players = [guestPlayer, openAIPlayer];
    const startingPlayer = getStartingPlayer(gameTrump, players);
    const startingIndex = players.findIndex(
      (p) => p.user._id === startingPlayer.user._id
    );
    const defenderPlayer = players[(startingIndex + 1) % players.length];

    // const game: Game = {
    //   withOpenAI: true,
    //   isPrivate: false,
    //   id: guestId,
    //   deck: finishDeckIds,
    //   trump: gameTrump,
    //   attackingPlayerId: startingPlayer.user._id,
    //   defendingPlayerId: defenderPlayer.user._id,
    //   turnPlayerId: startingPlayer.user._id,
    //   defenderSurrendered: false,
    //   players,
    //   playersCount: players.length as 2,
    //   table: [],
    //   turnMaxTime: generateTurnTime(),
    //   status: "active",
    //   code: "",
    // };

    const redisColumnName = `${REDIS_COLUMN_NAMES.AI_GAME}:${guestId}`;
    await AppRedis.set(redisColumnName, JSON.stringify({}));
  },

  getAIGameRoom: async (guestId: string): Promise<Game | null> => {
    const redisColumnName = `${REDIS_COLUMN_NAMES.AI_GAME}:${guestId}`;
    const gameJson = await AppRedis.get(redisColumnName);
    return gameJson ? JSON.parse(gameJson) : null;
  },

  aiTurn: async (game: Game, guestId: string, isAttacking: boolean) => {
    const redisColumnName = `${REDIS_COLUMN_NAMES.AI_GAME}:${guestId}`;

    // switch (isAttacking) {
    //   case true:
    //     const attackingCard = await getOpenaiAttackingMove(game);
    //     const foundCardForAttack = !!attackingCard;

    //     switch (foundCardForAttack) {
    //       case true:
    //         const aiPlayerCardIds = game.players
    //           .find(({ user }) => user._id === OPEN_AI_PLAYER_ID)
    //           ?.cardIds.filter((id) => id !== attackingCard!.id);

    //         const updatedPlayersForAttack = game.players.map((player) =>
    //           player.user._id === OPEN_AI_PLAYER_ID
    //             ? { ...player, cardIds: aiPlayerCardIds ?? player.cardIds }
    //             : player
    //         );

    //         const updatedGame: Game = {
    //           ...game,
    //           table: [...game.table, [attackingCard!.id, undefined]],
    //           players: updatedPlayersForAttack,
    //           turnPlayerId: guestId,
    //           turnMaxTime: generateTurnTime(),
    //         };

    //         await AppRedis.set(redisColumnName, JSON.stringify(updatedGame));
    //         return "move";

    //       case false:
    //         let deckCards = game.deck;

    //         const updatedPlayers = game.players.map((player) => {
    //           const { updatedCurrentCardsIds, updatedDeckCardsIds } =
    //             giveRandomCards(deckCards, player.cardIds);
    //           deckCards = updatedDeckCardsIds;
    //           return {
    //             ...player,
    //             cardIds: updatedCurrentCardsIds,
    //           };
    //         });

    //         const { newAttackingPlayerId, newDefendingPlayerId } =
    //           getNewAttackerAndDefenderPlayerOnFinishGame(game, "beaten");

    //         const beatenGame: Game = {
    //           ...game,
    //           table: [],
    //           players: updatedPlayers,
    //           deck: deckCards,
    //           turnMaxTime: generateTurnTime(),
    //           attackingPlayerId: newAttackingPlayerId,
    //           defendingPlayerId: newDefendingPlayerId,
    //           turnPlayerId: newAttackingPlayerId,
    //         };
    //         await AppRedis.set(redisColumnName, JSON.stringify(beatenGame));
    //         return "beaten";

    //       default:
    //         return "beaten";
    //         break;
    //     }
    //     break;

    //   case false:
    //     const needToClosingCardId = game.table.find((cards) => !cards[1])?.[0];

    //     if (!needToClosingCardId)
    //       throw new Error(MESSAGES.GENERAL.UNKNOWN_ERROR);

    //     const needToClosingCard = getCardById(needToClosingCardId);

    //     const defendingCard = await getOpenaiDefendingMove(
    //       game,
    //       needToClosingCard
    //     );
    //     const foundCardForDefense = !!defendingCard;

    //     switch (foundCardForDefense) {
    //       case true:
    //         const aiPlayerCardIds = game.players
    //           .find(({ user }) => user._id === OPEN_AI_PLAYER_ID)
    //           ?.cardIds.filter((id) => id !== defendingCard!.id);

    //         const updatedPlayersForDefense = game.players.map((player) =>
    //           player.user._id === OPEN_AI_PLAYER_ID
    //             ? { ...player, cardIds: aiPlayerCardIds ?? player.cardIds }
    //             : player
    //         );

    //         const newTable: [number, number | undefined][] = game.table.map(
    //           (cards) => {
    //             if (cards[0] !== needToClosingCardId) return cards;
    //             return [needToClosingCardId, defendingCard?.id];
    //           }
    //         );

    //         const updatedGame: Game = {
    //           ...game,
    //           table: newTable,
    //           players: updatedPlayersForDefense,
    //           turnPlayerId: guestId,
    //           turnMaxTime: generateTurnTime(),
    //         };

    //         await AppRedis.set(redisColumnName, JSON.stringify(updatedGame));
    //         return "move";
    //       case false:
    //         console.log("ai take it");

    //         const updatedSurrenderedGame: Game = {
    //           ...game,
    //           turnPlayerId: guestId,
    //           turnMaxTime: generateTurnTime(),
    //           defenderSurrendered: true,
    //         };
    //         await AppRedis.set(
    //           redisColumnName,
    //           JSON.stringify(updatedSurrenderedGame)
    //         );
    //         return "take";
    //       default:
    //         return "beaten";
    //     }

    //   default:
    //     return "beaten";
    // }
  },

  beatCard: async (
    attackingCardId: number,
    defendingCardId: number,
    game: Game,
    guestId: string
  ) => {
    // const foundTableCards = game.table.find((i) => i[0] === attackingCardId);
    // const attackingCardIsValid = !foundTableCards?.[1] && foundTableCards?.[0];
    // if (!attackingCardIsValid) throw new Error("System error!");
    // const canBeatCard = tryBeatCard(
    //   getCardById(attackingCardId),
    //   getCardById(defendingCardId),
    //   game.trump
    // );
    // if (!canBeatCard) throw new Error(MESSAGES.GAME.CHEATING);
    // const newTable = game.table.map((tableItem) => {
    //   if (tableItem[0] !== attackingCardId) return tableItem;
    //   return [attackingCardId, defendingCardId];
    // }) as [number, number][];
    // const newPlayers = game.players.map((player) => {
    //   if (player.user._id !== guestId) return player;
    //   const updatedCards = player.cardIds.filter(
    //     (id) => id !== defendingCardId
    //   );
    //   return { ...player, cardIds: updatedCards };
    // });
    // //todo
    // const newTurnPlayerId = OPEN_AI_PLAYER_ID;
    // const updatedGame: Game = {
    //   ...game,
    //   table: newTable,
    //   players: newPlayers,
    //   turnPlayerId: newTurnPlayerId,
    //   turnMaxTime: generateTurnTime(),
    // };
    // const redisColumnName = `${REDIS_COLUMN_NAMES.AI_GAME}:${game.id}`;
    // await AppRedis.set(redisColumnName, JSON.stringify(updatedGame));
  },

  attackCard: async (attackingCardId: number, guestId: string, game: Game) => {
    // const canAttack = tryAttackCard(attackingCardId, game.table);
    // if (!canAttack) throw new Error(MESSAGES.GAME.CHEATING);
    // const guestPlayerCardIds = game.players
    //   .find(({ user }) => user._id === guestId)
    //   ?.cardIds.filter((id) => id !== attackingCardId);
    // const updatedPlayers = game.players.map((player) =>
    //   player.user._id === guestId
    //     ? { ...player, cardIds: guestPlayerCardIds ?? player.cardIds }
    //     : player
    // );
    // const updatedGame: Game = {
    //   ...game,
    //   table: [...game.table, [attackingCardId, undefined]],
    //   players: updatedPlayers,
    //   turnPlayerId: game.defenderSurrendered
    //     ? game.turnPlayerId
    //     : OPEN_AI_PLAYER_ID,
    //   turnMaxTime: generateTurnTime(),
    // };
    // const redisColumnName = `${REDIS_COLUMN_NAMES.AI_GAME}:${game.id}`;
    // await AppRedis.set(redisColumnName, JSON.stringify(updatedGame));
  },

  turnAction: async (game: Game, action: "pass" | "take", guestId: string) => {
    // switch (action) {
    //   case "pass":
    //     const { defenderSurrendered } = game;
    //     switch (defenderSurrendered) {
    //       case true:
    //         const defender = game.players.find(
    //           ({ user }) => user._id === game.defendingPlayerId
    //         )!;
    //         const attacker = game.players.find(
    //           ({ user }) => user._id !== defender.user._id
    //         )!;
    //         const { newAttackingPlayerId, newDefendingPlayerId } =
    //           getNewAttackerAndDefenderPlayerOnFinishGame(game, "take");
    //         const defenderNewCards = [
    //           ...defender.cardIds,
    //           ...game.table.flatMap(([id1, id2]) => [id1, id2]),
    //         ].filter((id) => !!id) as number[];
    //         const {
    //           updatedCurrentCardsIds: attackerNewCards,
    //           updatedDeckCardsIds,
    //         } = giveRandomCards(game.deck, attacker.cardIds);
    //         const newPlayers = game.players.map((player) => {
    //           if (player.user._id === newDefendingPlayerId)
    //             return { ...player, cardIds: defenderNewCards };
    //           else return { ...player, cardIds: attackerNewCards };
    //         });
    //         const updatedGame: Game = {
    //           ...game,
    //           attackingPlayerId: newAttackingPlayerId,
    //           defendingPlayerId: newDefendingPlayerId,
    //           deck: updatedDeckCardsIds,
    //           defenderSurrendered: false,
    //           players: newPlayers,
    //           table: [],
    //           turnMaxTime: generateTurnTime(),
    //           turnPlayerId: newAttackingPlayerId,
    //         };
    //         const redisColumnName = `${REDIS_COLUMN_NAMES.AI_GAME}:${game.id}`;
    //         await AppRedis.set(redisColumnName, JSON.stringify(updatedGame));
    //         break;
    //       case false:
    //         const {
    //           newAttackingPlayerId: attackingPlayerId,
    //           newDefendingPlayerId: defendingPlayerId,
    //         } = getNewAttackerAndDefenderPlayerOnFinishGame(game, "beaten");
    //         let newDeck = [...game.deck];
    //         const players = game.players.map((player) => {
    //           const { updatedCurrentCardsIds, updatedDeckCardsIds } =
    //             giveRandomCards(newDeck, player.cardIds);
    //           newDeck = updatedDeckCardsIds;
    //           return {
    //             ...player,
    //             cardIds: updatedCurrentCardsIds,
    //           };
    //         });
    //         const newGame: Game = {
    //           ...game,
    //           table: [],
    //           defenderSurrendered: false,
    //           attackingPlayerId,
    //           defendingPlayerId,
    //           turnMaxTime: generateTurnTime(),
    //           turnPlayerId: attackingPlayerId,
    //           players,
    //           deck: newDeck,
    //         };
    //         await AppRedis.set(
    //           `${REDIS_COLUMN_NAMES.AI_GAME}:${game.id}`,
    //           JSON.stringify(newGame)
    //         );
    //         break;
    //       default:
    //         break;
    //     }
    //     break;
    //   default:
    //     break;
    // }
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
