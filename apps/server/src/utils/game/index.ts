import {
  Card,
  CardSuits,
  Game,
  getCardById,
  MESSAGES,
  Player,
} from "../../../../../packages/shared";

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
  const removedCard =
    deckCardsIds.length > cardsNeeded
      ? deckCardsIds[deckCardsIds.length - 1]
      : null;
  const updatedDeck =
    deckCardsIds.length > cardsNeeded
      ? deckCardsIds.slice(0, deckCardsIds.length - 1)
      : deckCardsIds;

  const shuffledDeck = [...updatedDeck].sort(() => Math.random() - 0.5);
  const newCards = shuffledDeck.slice(0, cardsNeeded);
  const remainingDeck = removedCard
    ? [...shuffledDeck.slice(cardsNeeded), removedCard]
    : shuffledDeck.slice(cardsNeeded);

  const updatedCurrentCardsIds = [...currentCardsIds, ...newCards];

  return {
    updatedDeckCardsIds: remainingDeck,
    updatedCurrentCardsIds,
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

  const foundCard = getCardById(gameTrumpId);

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

export const generateTurnTime = () => {
  const now = new Date();
  const plus60Seconds = new Date(now.getTime() + 60 * 1000);
  return plus60Seconds;
};

export const tryBeatCard = (
  attackingCard: Card,
  defendingCard: Card,
  trump: CardSuits
): boolean => {
  if (attackingCard.suit === defendingCard.suit) {
    return defendingCard.value > attackingCard.value;
  } else if (defendingCard.suit === trump) return true;
  return false;
};

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

export const getNewAttackerAndDefenderPlayerOnFinishGame = (
  game: Game,
  action: "beaten" | "take"
) => {
  const players = game.players;
  const defenderIndex = players.findIndex(
    ({ user }) => user._id === game.defendingPlayerId
  );

  if (defenderIndex === -1) {
    throw new Error(MESSAGES.GENERAL.UNKNOWN_ERROR);
  }

  let newAttackerIndex: number;
  let newDefenderIndex: number;

  if (action === "beaten") {
    newAttackerIndex = defenderIndex;
    newDefenderIndex = (newAttackerIndex + 1) % players.length;
  } else {
    // take
    newAttackerIndex = (defenderIndex + 1) % players.length;
    newDefenderIndex = (newAttackerIndex + 1) % players.length;
  }

  return {
    newAttackingPlayerId: players[newAttackerIndex].user._id,
    newDefendingPlayerId: players[newDefenderIndex].user._id,
  };
};

export const convertSuitToSymbol = (suit: string): string => {
  switch (suit) {
    case "spades":
      return "♠";
    case "hearts":
      return "♥";
    case "diamonds":
      return "♦";
    case "clubs":
      return "♣";
    default:
      return suit;
  }
};

// NEW FUNCTIONALITY

export const giveCardsToPlayers = (
  prevDeck: number[],
  prevPlayers: Player[]
) => {
  let deck = prevDeck;
  const players = prevPlayers.map((player) => {
    const { updatedCurrentCardsIds, updatedDeckCardsIds } = giveRandomCards(
      deck,
      player.cardIds
    );
    deck = updatedDeckCardsIds;
    return { ...player, cardIds: updatedCurrentCardsIds };
  });
  return { deck, players };
};

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

export const getAttackerAndDefenderOnStartGame = (
  trump: CardSuits,
  players: Player[]
) => {
  const attacker = getStartingPlayer(trump, players);
  const attackerIndex = players.findIndex(
    ({ user }) => user._id === attacker.user._id
  );
  const defenderIndex =
    attackerIndex === players.length - 1 ? 0 : attackerIndex + 1;

  return {
    attacker,
    defender: players[defenderIndex],
  };
};

export * from "./stateActions";
export * from "./generators";
export * from "./checkers";
