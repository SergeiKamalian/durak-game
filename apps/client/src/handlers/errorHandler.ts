import { AxiosError } from "axios";
import { Notify } from "../ui";

export const handleError = (error: unknown) => {
  console.error(error);
  const axiosError = error as AxiosError<unknown>;
  const data = axiosError.response?.data;

  if (data && typeof data === "object" && "message" in data) {
    Notify({
      message: data.message as string,
    });
  }
};
