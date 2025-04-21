import { ALL_CARDS } from "../constants";

export const getCardById = (id: number) =>
  ALL_CARDS.find((card) => card.id === id) || ALL_CARDS[0];
