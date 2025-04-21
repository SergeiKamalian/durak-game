import { useCallback } from "react";
import {
  generateGuestId,
  getAccessToken,
  getGameWithAIStatus,
  getGuestId,
} from "../utils";
import {
  useAppSelector,
  useAppActions,
  useAuthActions,
  useAIGameActions,
} from "../store";
import { AIGameService, AuthService } from "../api";

export const useAppInitialization = () => {
  const { isInitialized } = useAppSelector();
  const { setAppInitializedStatus } = useAppActions();
  const { setUser } = useAuthActions();
  const { setAIGame } = useAIGameActions();

  const initializeGuest = useCallback(async () => {
    const guestId = getGuestId();
    if (!guestId) {
      generateGuestId();
      return;
    }
    const gameWithAiStarted = getGameWithAIStatus();
    if (!gameWithAiStarted) return;
    const gameRes = await AIGameService.getGame();
    setAIGame(gameRes);
  }, [setAIGame]);

  const initializeApp = useCallback(async () => {
    if (isInitialized) return;
    try {
      const token = getAccessToken();
      if (!token) {
        await initializeGuest();
        return;
      }
      const userRes = await AuthService.whoami();
      setUser(userRes);
    } catch (error) {
      console.error(error);
    } finally {
      setAppInitializedStatus(true);
    }
  }, [initializeGuest, isInitialized, setAppInitializedStatus, setUser]);

  initializeApp();
};
