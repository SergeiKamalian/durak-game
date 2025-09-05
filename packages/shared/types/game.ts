import { CardSuits } from "./card";
import { Player, PlayerReturnType } from "./player";

export type GamePlayersCount = 2 | 3 | 4 | 5 | 6;

type GameStatus = "starting" | "active";

type BaseGame<TPlayer = Player> = {
  meta: {
    withOpenAI: boolean;
    id: string;
    status: GameStatus;
    isPrivate: boolean;
    code: string;
    playersCount: GamePlayersCount;
  };
  players: {
    list: TPlayer[];
    attackingPlayerId: string;
    defendingPlayerId: string;
    turnPlayerId: string;
  };
  table: {
    deck: number[];
    cards: TableCards;
    trump: CardSuits;
  };
  turn: {
    defenderSurrendered: boolean;
    turnMaxTime: Date | null;
    roundActions: { playerId: string; action: "pass" | "take" }[];
  };
};

export type Game = BaseGame<Player>;

export type TableCards = [number, number | undefined][];

export type GameReturnType = Omit<BaseGame<PlayerReturnType>, "table"> & {
  table: Omit<BaseGame<PlayerReturnType>["table"], "deck"> & {
    deck: {
      cardsCount: number;
    };
  };
  players: BaseGame<PlayerReturnType>["players"] & {
    currentPlayer: Player;
  };
};

export type GameTurnAction = "pass" | "take" | "move" | "beaten";
