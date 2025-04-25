import { axiosInstance } from "../..";
import {
  CreateGameRoomRequest,
  CreateGameRoomResponse,
  PlayerAttackTurnRequest,
  PlayerDefenseTurnRequest,
} from "../../../../../../packages/shared";

export const GameService = new (class {
  async createGameRoom(
    data: CreateGameRoomRequest
  ): Promise<CreateGameRoomResponse> {
    return axiosInstance.post("/game/create", data).then((res) => res.data);
  }
  async playerAttackTurn(
    data: PlayerAttackTurnRequest
  ): Promise<CreateGameRoomResponse> {
    return axiosInstance
      .post(`/game/${data.id}/player-turn`, data)
      .then((res) => res.data);
  }
  async playerDefenseTurn(
    data: PlayerDefenseTurnRequest
  ): Promise<CreateGameRoomResponse> {
    return axiosInstance
      .post(`/game/${data.id}/player-turn`, data)
      .then((res) => res.data);
  }
})();
