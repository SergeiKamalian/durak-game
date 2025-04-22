import { useCallback, useEffect } from "react";
import { useAIGameSelector } from "../../../store";
import { handleError } from "../../../handlers";
import { AIGameService } from "../../../api";

export const useGameRoom = () => {
  const { aiGame } = useAIGameSelector();

  const aiTurn = useCallback(async () => {
    try {
      const res = await AIGameService.aiTurn();
    } catch (error) {
      handleError(error);
    }
  }, []);

  useEffect(() => {
    if (aiGame?.attackingPlayerId === "OpenAI") {
      aiTurn();
    }
  }, [aiGame?.attackingPlayerId, aiTurn]);

  return {};
};
