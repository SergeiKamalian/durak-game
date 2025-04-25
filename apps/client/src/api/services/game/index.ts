import { axiosInstance } from "../..";
import { Game } from "../../../../../../packages/shared";
import { getGuestId } from "../../../utils";

export const GameService = new (class {
  async createGameRoom(): Promise<Game> {
    const guestId = getGuestId();
    return axiosInstance
      .post(
        "/game/create",
        { withOpenAI: true },
        {
          headers: {
            guestId,
          },
        }
      )
      .then((res) => res.data);
  }
})();
