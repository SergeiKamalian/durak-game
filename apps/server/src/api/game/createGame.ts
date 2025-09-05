import {
  ALL_CARDS,
  CardSuits,
  Game,
  GameReturnType,
  MESSAGES,
  OPEN_AI_USER,
  Player,
  UserType,
} from "../../../../../packages/shared";
import { UserModel } from "../../database/model";
import { AuthFromRequest } from "../../middlewares";
import {
  generateRoomId,
  generateTurnTime,
  getAttackerAndDefenderOnStartGame,
  getGameTrump,
  giveCardsToPlayers,
  setGame,
} from "../../utils";

export const createRoom = async (
  auth: AuthFromRequest["auth"],
  withOpenAI: boolean,
  isPrivate?: boolean,
  needsPlayersCount?: number
): Promise<GameReturnType> => {
  if (typeof withOpenAI !== "boolean")
    throw new Error(MESSAGES.GAME.PARAMS_ISSUE);

  const id = auth.isAuth ? auth.userId : auth.guestId;
  let game: Game | null = null;
  if (withOpenAI) {
    game = await createAIRoom(id);
  } else {
    const roomCode = generateRoomId();
    game = await createGameRoom(
      roomCode,
      id,
      isPrivate || false,
      needsPlayersCount || 2
    );
  }
  const gameReturn = await setGame(id, game, id);
  return gameReturn;
};

const createAIRoom = async (id: string) => {
  const currentPlayer: Player = {
    user: {
      createdAt: new Date(),
      updatedAt: new Date(),
      name: "Guest",
      _id: id,
    },
    cardIds: [],
    status: "active",
    index: 0,
  };
  const aiPlayer: Player = {
    user: OPEN_AI_USER,
    cardIds: [],
    status: "active",
    index: 1,
  };
  const game = generateInitialGameRoom(id, true, [aiPlayer, currentPlayer], 2);
  return game;
};

const createGameRoom = async (
  id: string,
  userId: string,
  isPrivate: boolean,
  needsPlayersCount: number
) => {
  const user = await UserModel.findOne({ _id: userId }).select([
    "name",
    "createdAt",
    "updatedAt",
  ]);
  const player: Player = {
    cardIds: [],
    status: "active",
    user: user as UserType,
    index: 0,
  };
  const game = generateInitialGameRoom(
    id,
    isPrivate,
    [player],
    needsPlayersCount
  );

  return game;
};

const generateGameStateOnStart = (currentPlayers: Player[]) => {
  const { deck: currentDeck, players } = giveCardsToPlayers(
    ALL_CARDS.map(({ id }) => id),
    currentPlayers
  );
  const { gameTrump: trump, updatedDeckIds: deck } = getGameTrump(currentDeck);
  const { attacker, defender } = getAttackerAndDefenderOnStartGame(
    trump,
    players
  );
  return {
    players,
    deck,
    trump,
    attacker,
    defender,
  };
};

const generateInitialGameRoom = (
  roomId: string,
  isPrivate: boolean,
  currentPlayers: Player[],
  needsPlayersCount: number
): Game => {
  if (currentPlayers.length === needsPlayersCount) {
    const { attacker, defender, deck, players, trump } =
      generateGameStateOnStart(currentPlayers);
    return {
      meta: {
        id: roomId,
        code: isPrivate ? "" : roomId,
        isPrivate,
        playersCount: players.length as 2,
        withOpenAI: true,
        status: "active",
      },
      players: {
        list: players,
        turnPlayerId: attacker.user._id,
        attackingPlayerId: attacker.user._id,
        defendingPlayerId: defender.user._id,
      },
      table: {
        deck,
        cards: [],
        trump,
      },
      turn: {
        defenderSurrendered: false,
        roundActions: [],
        turnMaxTime: generateTurnTime(),
      },
    };
  } else {
    return {
      meta: {
        id: roomId,
        code: isPrivate ? "" : roomId,
        isPrivate,
        playersCount: needsPlayersCount as 2,
        withOpenAI: false,
        status: "starting",
      },
      players: {
        list: currentPlayers,
        turnPlayerId: "",
        attackingPlayerId: "",
        defendingPlayerId: "",
      },
      table: {
        deck: ALL_CARDS.map(({ id }) => id),
        cards: [],
        trump: CardSuits.CLUBS,
      },
      turn: {
        roundActions: [],
        defenderSurrendered: false,
        turnMaxTime: generateTurnTime(),
      },
    };
  }
};
