import { Player } from "../../../../../../../../../../packages/shared";
import { useAIGameSelector } from "../../../../../../../store";

export const useOpponent = (player: Player) => {
  const { aiGame } = useAIGameSelector();

  const isAttacker = player.user._id === aiGame?.attackingPlayerId;
  const isDefender = player.user._id === aiGame?.defendingPlayerId;

  const playerIsDefenderAndDefenderSurrendered = !!(
    aiGame?.defenderSurrendered && isDefender
  );

  return {
    isAttacker,
    playerIsDefenderAndDefenderSurrendered,
  };
};
