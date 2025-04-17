import { CardSuits } from "./card";
import { Player } from "./player";

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
  isTurnAttacker: boolean;
  turnMaxTime: Date | null;
  playersCount: GamePlayersCount;
  status: GameStatus;
};

type PrivateProps = {
  isPrivate: true;
  code: string;
};

type LobbyProps = {
  isPrivate: false;
};

export type Game = BaseGame & (PrivateProps | LobbyProps);
