import { useSelector } from "react-redux";
import { RootState } from "..";

export const useAppSelector = () => {
  return { ...useSelector((state: RootState) => state.app) };
};

export const useAuthSelector = () => {
  return { ...useSelector((state: RootState) => state.auth) };
};
