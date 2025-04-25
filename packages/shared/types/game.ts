import { CardSuits } from "./card";
import { Player, PlayerReturnType } from "./player";

export type GamePlayersCount = 2 | 3 | 4 | 5 | 6;

type GameStatus = "starting" | "active";

type BaseGame = {
  withOpenAI: boolean;
  id: string;
  players: Player[];
  table: [number, number | undefined][];
  deck: number[];
  trump: CardSuits;
  attackingPlayerId: string;
  defendingPlayerId: string;
  turnPlayerId: string;
  defenderSurrendered: boolean;
  turnMaxTime: Date | null;
  playersCount: GamePlayersCount;
  status: GameStatus;
  isPrivate: boolean;
  code: string;
};

export type Game = BaseGame;
export type GameReturnType = {
  withOpenAI: boolean;
  id: string;
  players: PlayerReturnType[];
  table: [number, number | undefined][];
  deckCardsCount: number;
  trump: CardSuits;
  attackingPlayerId: string;
  defendingPlayerId: string;
  turnPlayerId: string;
  defenderSurrendered: boolean;
  turnMaxTime: Date | null;
  playersCount: GamePlayersCount;
  status: GameStatus;
  currentPlayer: Player;
};
export type GameTurnAction = "pass" | "take" | "move" | "beaten";
