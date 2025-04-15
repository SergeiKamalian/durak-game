import { useCallback, useState } from "react";
import {
  CreateUserBody,
  CreateUserResponse,
} from "../../../../../packages/shared";
import { AuthService } from "../../api";
import { useTheme } from "styled-components";
import { setAccessToken, setRefreshToken } from "../../utils";
import { useAppActions, useAuthActions } from "../../store";
import { Notify } from "../../ui";

export const useAuth = () => {
  const { setUser } = useAuthActions();
  const { setAppLoadingStatus } = useAppActions();
  const theme = useTheme();
  const [isAuthorization, setIsAuthorization] = useState(true);

  const switchAuthView = useCallback(
    () => setIsAuthorization((prev) => !prev),
    []
  );

  const handleSubmit = useCallback(
    async (form: CreateUserBody) => {
      try {
        setAppLoadingStatus(true);
        let res: CreateUserResponse | null = null;
        if (isAuthorization) {
          res = await AuthService.loginUser(form);
        } else {
          res = await AuthService.createUser(form);
        }
        if (!res || !res.accessToken || !res.refreshToken) return;
        setAccessToken(res.accessToken);
        setRefreshToken(res.refreshToken);
        setUser(res.user);
        Notify({
          message: isAuthorization
            ? `You’re now logged in`
            : `Your account has been created`,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setAppLoadingStatus(false);
      }
    },
    [isAuthorization, setAppLoadingStatus, setUser]
  );

  return { theme, isAuthorization, switchAuthView, handleSubmit };
};
