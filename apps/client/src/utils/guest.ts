import { v4 as uuidv4 } from "uuid";

export const generateGuestId = () => {
  const guestId = uuidv4();
  localStorage.setItem("guestId", guestId);
};

export const getGuestId = (): string | null => {
  return localStorage.getItem("guestId");
};

export const startGameWithAI = () => {
  localStorage.setItem("ai-game", "true");
};

export const getGameWithAIStatus = () => {
  return Boolean(localStorage.getItem("ai-game"));
};
