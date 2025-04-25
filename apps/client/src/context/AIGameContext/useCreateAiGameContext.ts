import { useCallback, useEffect, useState } from "react";
import { useAIGameActions, useAIGameSelector } from "../../store";
import { AIGameService } from "../../api";
import { handleError } from "../../handlers";
import { OPEN_AI_PLAYER_ID } from "../../../../../packages/shared";
import { getGuestId } from "../../utils";

export const useCreateAiGameContext = () => {
  const { aiGame } = useAIGameSelector();
  const { setAIGame } = useAIGameActions();

  const [playerSelectedCardId, setPlayerSelectedCardId] = useState<
    number | null
  >(null);

  const aiTurn = useCallback(
    async (isAttacking: boolean) => {
      try {
        const res = await AIGameService.aiTurn({ isAttacking });

        setAIGame(res.game);
        // }
      } catch (error) {
        handleError(error);
      }
    },
    [setAIGame]
  );

  const beatCardHandler = useCallback(
    async (attackingCardId: number) => {
      try {
        if (!aiGame) return;
        const trump = aiGame.trump;
        const defendingCardId = playerSelectedCardId;
        if (!defendingCardId) return;
        const res = await AIGameService.beatCard({
          defendingCardId,
          attackingCardId,
          trump,
        });
        setAIGame(res);
      } catch (error) {
        handleError(error);
      }
    },
    [aiGame, playerSelectedCardId, setAIGame]
  );

  const selectPlayerCardHandler = useCallback(
    async (id: number) => {
      try {
        const guestId = getGuestId();
        if (
          aiGame?.attackingPlayerId === guestId &&
          aiGame.turnPlayerId === guestId
        ) {
          const res = await AIGameService.attackCard({ attackingCardId: id });
          setAIGame(res.game);
        } else {
          setPlayerSelectedCardId(id);
        }
      } catch (error) {
        handleError(error);
      }
    },
    [aiGame?.attackingPlayerId, aiGame?.turnPlayerId, setAIGame]
  );

  const passHandler = useCallback(async () => {
    try {
      console.log("pass");
      const res = await AIGameService.turnAction({ action: "pass" });
      setAIGame(res);
    } catch (error) {
      handleError(error);
    }
  }, [setAIGame]);

  useEffect(() => {
    if (aiGame?.turnPlayerId === OPEN_AI_PLAYER_ID) {
      aiTurn(aiGame?.attackingPlayerId === OPEN_AI_PLAYER_ID);
    }
  }, [aiGame?.attackingPlayerId, aiGame?.turnPlayerId]);

  return {
    selectPlayerCardHandler,
    beatCardHandler,
    passHandler,
    playerSelectedCardId,
  };
};
