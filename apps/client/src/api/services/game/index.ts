import { axiosInstance } from "../..";
import {
  CreateGameRoomRequest,
  CreateGameRoomResponse,
  GetGameRoomRequest,
  LeftGameRoomRequest,
  PlayerActionRequest,
  PlayerAttackTurnRequest,
  PlayerDefenseTurnRequest,
} from "../../../../../../packages/shared";

export const GameService = new (class {
  async createGameRoom(
    data: CreateGameRoomRequest
  ): Promise<CreateGameRoomResponse> {
    return axiosInstance.post("/game/create", data).then((res) => res.data);
  }
  async getGameRoom(data: GetGameRoomRequest): Promise<CreateGameRoomResponse> {
    return axiosInstance.get(`/game/${data.id}`).then((res) => res.data);
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
  async playerAction(
    data: PlayerActionRequest
  ): Promise<CreateGameRoomResponse> {
    return axiosInstance
      .post(`/game/${data.id}/player-action`, data)
      .then((res) => res.data);
  }
  async leaveGame(data: LeftGameRoomRequest): Promise<CreateGameRoomResponse> {
    return axiosInstance
      .post(`/game/${data.id}/leave`, data)
      .then((res) => res.data);
  }
})();
