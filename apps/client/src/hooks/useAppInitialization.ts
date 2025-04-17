import { useCallback } from "react";
import { generateGuestId, getAccessToken, getGuestId } from "../utils";
import { useAppSelector, useAppActions, useAuthActions } from "../store";
import { AuthService } from "../api";

export const useAppInitialization = () => {
  const { isInitialized } = useAppSelector();
  const { setAppInitializedStatus } = useAppActions();
  const { setUser } = useAuthActions();

  const initializeApp = useCallback(async () => {
    if (isInitialized) return;
    try {
      const token = getAccessToken();
      if (!token) {
        const guestId = getGuestId();
        if (guestId) return;
        generateGuestId();
        return;
      }
      const userRes = await AuthService.whoami();
      setUser(userRes);
    } catch (error) {
      console.error(error);
    } finally {
      setAppInitializedStatus(true);
    }
  }, [isInitialized, setAppInitializedStatus, setUser]);

  initializeApp();
};
