import { ReactNode } from "react";
import { Loading, Notification } from "../../ui";

interface AppProviderProps {
  children: ReactNode;
}
export const AppProvider = (props: AppProviderProps) => {
  return (
    <>
      <Notification />
      <Loading />
      <div
        style={{
          zIndex: 1,
          position: "relative",
          width: "100svw",
          height: "100svh",
        }}
      >
        {props.children}
      </div>
    </>
  );
};
