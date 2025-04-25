import { createRoom } from "./createGame";
import { playerAttack, playerDefense } from "./playerTurn";

export const GAME_ROOM_API = {
  CREATING: {
    createRoom,
  },
  TURN: {
    playerAttack,
    playerDefense,
  },
};
