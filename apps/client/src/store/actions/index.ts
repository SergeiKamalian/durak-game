import { useDispatch } from "react-redux";
import {
  changeAIGame,
  changeAppInitializedStatus,
  changeAppLoadingStatus,
  changeUser,
} from "../slices";
import { Game, UserType } from "../../../../../packages/shared";

export const useAppActions = () => {
  const dispatch = useDispatch();

  const setAppInitializedStatus = (isInitialized: boolean) =>
    dispatch(changeAppInitializedStatus(isInitialized));

  const setAppLoadingStatus = (isLoading: boolean) =>
    dispatch(changeAppLoadingStatus(isLoading));

  return {
    setAppInitializedStatus,
    setAppLoadingStatus,
  };
};

export const useAuthActions = () => {
  const dispatch = useDispatch();

  const setUser = (user: UserType | null) => dispatch(changeUser(user));

  return { setUser };
};

export const useAIGameActions = () => {
  const dispatch = useDispatch();

  const setAIGame = (game: Game | null) => dispatch(changeAIGame(game));

  return { setAIGame };
};
