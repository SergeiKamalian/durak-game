import { GameReturnType } from "../types";

// Create
export type CreateGameRoomRequest = {
  withOpenAI: boolean;
};
export type CreateGameRoomResponse = {
  game: GameReturnType;
};

// Get
export type GetGameRoomRequest = {
  id: string;
};

// Leave
export type LeftGameRoomRequest = GetGameRoomRequest;

// Actions
export type PlayerActionRequest = {
  id: string;
  action: "take" | "pass";
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
