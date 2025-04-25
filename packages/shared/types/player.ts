import { UserType } from "./user";

export type PlayerStatus = "connecting" | "ready" | "active" | "left";

export type Player = {
  user: UserType;
  cardIds: number[];
  status: PlayerStatus;
  index: number;
};

export type PlayerReturnType = {
  user: UserType;
  status: PlayerStatus;
  cardsCount: number;
  index: number;
};
