import { axiosInstance } from "../..";
import {
  CardSuits,
  Game,
  GameTurnAction,
} from "../../../../../../packages/shared";
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
  async aiTurn({
    isAttacking,
  }: {
    isAttacking: boolean;
  }): Promise<{ game: Game; action: GameTurnAction }> {
    const guestId = getGuestId();
    return axiosInstance
      .post(
        "/ai-game/ai-turn",
        { isAttacking },
        {
          headers: {
            guestId,
          },
        }
      )
      .then((res) => res.data);
  }

  async beatCard(data: {
    attackingCardId: number;
    defendingCardId: number;
    trump: CardSuits;
  }): Promise<Game> {
    const guestId = getGuestId();
    return axiosInstance
      .post(
        "/ai-game/beat-card",
        { ...data },
        {
          headers: {
            guestId,
          },
        }
      )
      .then((res) => res.data);
  }

  async attackCard(data: {
    attackingCardId: number;
  }): Promise<{ game: Game; action: GameTurnAction }> {
    const guestId = getGuestId();
    return axiosInstance
      .post(
        "/ai-game/attack-card",
        { ...data },
        {
          headers: {
            guestId,
          },
        }
      )
      .then((res) => res.data);
  }
  async turnAction(data: { action: "pass" | "take" }): Promise<Game> {
    const guestId = getGuestId();
    return axiosInstance
      .post(
        "/ai-game/player-action",
        { ...data },
        {
          headers: {
            guestId,
          },
        }
      )
      .then((res) => res.data);
  }
})();
