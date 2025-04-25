import { CardSuits, getCardById } from "../../../../../packages/shared";

export const tryAttackCard = (
  attackingCardId: number,
  table: [number, number | undefined][]
): boolean => {
  if (!table.length) return true;
  const attackingCard = getCardById(attackingCardId);
  return !!table.some(
    ([first, second]) =>
      getCardById(first).value === attackingCard.value ||
      (second ? getCardById(second).value === attackingCard.value : false)
  );
};

export const tryCloseCard = (
  inTableCardId: number,
  playerCardId: number,
  trump: CardSuits
): boolean => {
  const inTableCard = getCardById(inTableCardId);
  const playerCard = getCardById(playerCardId);
  if (inTableCard.suit === playerCard.suit) {
    return playerCard.value > inTableCard.value;
  } else if (playerCard.suit === trump) return true;
  return false;
};
