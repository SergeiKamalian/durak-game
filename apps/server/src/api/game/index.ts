import { createRoom } from "./createGame";
import { leaveGame } from "./leave";
import { playerAttack, playerDefense } from "./playerTurn";
import { playerPassAction, playerTakeAction } from "./playerAction";

export const GAME_ROOM_API = {
  createRoom,
  leaveGame,
  playerAttack,
  playerDefense,
  playerPassAction,
  playerTakeAction,
};
