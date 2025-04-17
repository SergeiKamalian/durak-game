import { ALL_CARDS, CardSuits, Player } from "../../../../packages/shared";

export const giveRandomCards = (
  deckCardsIds: number[],
  currentCardsIds: number[]
) => {
  const MAX_CARDS = 6;
  const cardsNeeded = Math.min(
    MAX_CARDS - currentCardsIds.length,
    deckCardsIds.length
  );

  if (cardsNeeded <= 0) {
    return {
      updatedDeckCardsIds: deckCardsIds,
      updatedCurrentCardsIds: currentCardsIds,
    };
  }

  const shuffledDeck = [...deckCardsIds].sort(() => Math.random() - 0.5);
  const newCards = shuffledDeck.slice(0, cardsNeeded);
  const remainingDeck = shuffledDeck.slice(cardsNeeded);

  return {
    updatedDeckCardsIds: remainingDeck,
    updatedCurrentCardsIds: [...currentCardsIds, ...newCards],
  };
};

export const getGameTrump = (
  deckCardsIds: number[]
): {
  gameTrump: CardSuits;
  updatedDeckIds: number[];
} => {
  if (deckCardsIds.length === 0) {
    throw new Error("Deck is empty");
  }

  const randomIndex = Math.floor(Math.random() * deckCardsIds.length);
  const gameTrumpId = deckCardsIds[randomIndex];

  const foundCard = ALL_CARDS.find(({ id }) => id === gameTrumpId);

  if (!foundCard) {
    throw new Error("Error");
  }

  const updatedDeckIds = [
    ...deckCardsIds.slice(0, randomIndex),
    ...deckCardsIds.slice(randomIndex + 1),
    gameTrumpId,
  ];

  return {
    gameTrump: foundCard.suit,
    updatedDeckIds,
  };
};

export const getCardById = (id: number) =>
  ALL_CARDS.find((card) => card.id === id) || ALL_CARDS[0];

export const getStartingPlayer = (
  trump: CardSuits,
  players: Player[]
): Player => {
  const playersWithTrumpCards = players
    .map((player) => {
      const trumpCards = player.cardIds
        .map(getCardById)
        .filter((card) => card.suit === trump);

      return {
        player,
        trumpCards,
      };
    })
    .filter(({ trumpCards }) => trumpCards.length > 0);

  if (playersWithTrumpCards.length === 0) {
    return players[0];
  }

  if (playersWithTrumpCards.length === 1) {
    return playersWithTrumpCards[0].player;
  }

  // Несколько игроков — ищем того, у кого минимальный value козырной карты
  let minValue = Infinity;
  let startingPlayer: Player = players[0];

  playersWithTrumpCards.forEach(({ player, trumpCards }) => {
    const playerMinCard = trumpCards.reduce(
      (minCard, card) => (card.value < minCard.value ? card : minCard),
      trumpCards[0]
    );

    if (playerMinCard.value < minValue) {
      minValue = playerMinCard.value;
      startingPlayer = player;
    }
  });

  return startingPlayer;
};
