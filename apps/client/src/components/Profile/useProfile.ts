import { useCallback } from "react";
import { useAuthActions } from "../../store";
import { handleError } from "../../handlers";
import { AuthService } from "../../api";
import { removeTokens } from "../../utils";

export const useProfile = () => {
  const { setUser } = useAuthActions();

  const logout = useCallback(async () => {
    try {
      await AuthService.logout();
      removeTokens();
      setUser(null);
    } catch (error) {
      handleError(error);
    }
  }, [setUser]);

  return { logout };
};
