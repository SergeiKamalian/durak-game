import { axiosInstance } from "../..";
import { Game } from "../../../../../../packages/shared";
import { getGuestId } from "../../../utils";

export const AIGameService = new (class {
  async createGame(): Promise<Game> {
    const guestId = getGuestId();
    return axiosInstance
      .post(
        "/ai-game/create-room",
        {},
        {
          headers: {
            guestId,
          },
        }
      )
      .then((res) => res.data);
  }
  async getGame(): Promise<Game | null> {
    const guestId = getGuestId();
    return axiosInstance
      .get("/ai-game/get-room", {
        headers: {
          guestId,
        },
      })
      .then((res) => res.data.game);
  }
})();
