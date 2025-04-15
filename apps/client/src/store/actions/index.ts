import { useDispatch } from "react-redux";
import {
  changeAppInitializedStatus,
  changeAppLoadingStatus,
  changeUser,
} from "../slices";
import { UserType } from "../../../../../packages/shared";

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
