import { memo } from "react";
import { useAIGameSelector } from "../../store";
import { Auth, GameRoom } from "../../components";
export const GuestProfile = memo(() => {
  const { aiGame } = useAIGameSelector();

  if (aiGame) return <GameRoom />;
  return <Auth />;
});
