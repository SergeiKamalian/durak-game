import { GameReturnType } from "../types";

// Create
export type CreateGameRoomRequest = {
  withOpenAI: boolean;
};
export type CreateGameRoomResponse = {
  game: GameReturnType;
};

// Turns
export type PlayerAttackTurnRequest = {
  id: string;
  turn: "attack";
  cardId: number;
};
export type PlayerDefenseTurnRequest = {
  id: string;
  turn: "defense";
  inTableCardId: number;
  playerCardId: number;
};
