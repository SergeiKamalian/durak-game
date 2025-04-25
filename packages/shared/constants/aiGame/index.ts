import { UserType } from "../../types";

export const OPEN_AI_PLAYER_ID = "OpenAI";
export const OPEN_AI_USER: UserType = {
  name: OPEN_AI_PLAYER_ID,
  _id: OPEN_AI_PLAYER_ID,
  createdAt: new Date(),
  updatedAt: new Date(),
};
