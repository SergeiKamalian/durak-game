import { Card, CardSuits, getCardById } from "../../../../packages/shared";

export const getCardsPositions = (length: number): number[] => {
  const half = Math.floor(length / 2);
  const offset = length % 2 === 0 ? 0.5 : 0;
  return Array.from({ length }, (_, i) => i - half + offset);
};
export const sortUserCards = (cardIds: number[], trump: CardSuits) => {
  const cards = cardIds.map(getCardById);

  const trumpCards: Card[] = [];
  const nonTrumpCards: Card[] = [];

  for (const card of cards) {
    if (card.suit === trump) {
      trumpCards.push(card);
    } else {
      nonTrumpCards.push(card);
    }
  }
  const trumpCardsIds = trumpCards.map(({ id }) => id).sort((a, b) => a - b);
  const nonTrumpCardsIds = nonTrumpCards
    .map(({ id }) => id)
    .sort((a, b) => a - b);

  return [...nonTrumpCardsIds, ...trumpCardsIds];
};
