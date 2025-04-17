import { v4 as uuidv4 } from "uuid";

export const generateGuestId = () => {
  const guestId = uuidv4();
  localStorage.setItem("guestId", guestId);
};

export const getGuestId = (): string | null => {
  return localStorage.getItem("guestId");
};
