// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { toast, ToastContainer, Flip } from "react-toastify";
import { FC } from "react";
import { NotifyComponent } from "./components";

const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast {
    width: 100%;
    height: fit-content;
    min-height: unset;
    max-height: fit-content;
    padding: 0;
    border-radius: 0;
    background: none;
    box-shadow: none;
    .Toastify__close-button {
      display: none;
    }
    .Toastify__progress-bar--wrp {
      opacity: 0;
    }
  }
`;

export const Notification: FC = () => {
  return <StyledToastContainer />;
};

export interface NotifyProps {
  message: string;
}

export const Notify = (props: NotifyProps) => {
  return toast(<NotifyComponent {...props} />, {
    position: "top-center",
    autoClose: 2000,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    transition: Flip,
  });
};
