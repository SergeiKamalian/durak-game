import { UserType } from "./user";

export type PlayerStatus = "connecting" | "ready" | "active" | "left";

export type Player = {
  user: UserType;
  cardIds: number[];
  status: PlayerStatus;
};
