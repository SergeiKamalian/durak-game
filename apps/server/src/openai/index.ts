import OpenAI from "openai";
import {
  Card,
  Game,
  getCardById,
  MESSAGES,
  OPEN_AI_PLAYER_ID,
} from "../../../../packages/shared";
import { AI_SYSTEM_ATTACK, AI_SYSTEM_DEFENSE } from "../constants";
import { convertSuitToSymbol } from "../utils";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY!,
});

export const getOpenaiAttackingMove = async (
  game: Game
): Promise<Card | null> => {
  try {
    const tableCards = game.table
      .flatMap(([id1, id2]) => [id1, id2])
      .filter((id): id is number => id !== undefined)
      .map(getCardById);

    const aiCards = (
      game.players.find(({ user }) => user._id === OPEN_AI_PLAYER_ID) ||
      game.players[0]
    ).cardIds.map(getCardById);

    const correctAiCards = (
      !tableCards.length
        ? aiCards
        : aiCards.filter((i) => tableCards.find((j) => j.value === i.value))
    ).sort((a, b) => a.value - b.value);

    const opponentCardsCount =
      game.players.find(({ user }) => user._id !== OPEN_AI_PLAYER_ID)?.cardIds
        .length || 0;
    const trumpSymbol = convertSuitToSymbol(game.trump);
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content: AI_SYSTEM_ATTACK.replace("{{trumpSymbol}}", trumpSymbol),
        },
        {
          role: "user",
          content: `
        Trump: ${trumpSymbol}, 
        Remaining cards count: ${game.deck.length}
        Opponent's card count: ${opponentCardsCount}
        Your cards: ${JSON.stringify(correctAiCards)}
        
        What to play?`,
        },
      ],
    });

    const aiAnswer = response?.choices[0].message.content?.trim();
    const aiAnswerCard = correctAiCards.find(
      ({ textValue }) => textValue === aiAnswer
    );

    if (aiAnswerCard) return aiAnswerCard;
    if (aiAnswer?.toLowerCase().includes("pass")) return null;
    const nonTrumpCards = correctAiCards.filter((i) => i.suit !== game.trump);
    const selectableCards = nonTrumpCards.length
      ? nonTrumpCards
      : correctAiCards;
    if (!selectableCards.length) return null;
    const lowestRankingCard = selectableCards.sort(
      (a, b) => a.value - b.value
    )[0];
    return lowestRankingCard;
  } catch (error) {
    return null;
  }
};

export const getOpenaiDefendingMove = async (
  game: Game,
  needToClosingCard: Card
) => {
  const aiCards = (
    game.players.find(({ user }) => user._id === OPEN_AI_PLAYER_ID) ||
    game.players[0]
  ).cardIds.map(getCardById);

  const validAiCards = aiCards.filter(
    (card) =>
      (card.suit === needToClosingCard.suit &&
        card.value > needToClosingCard.value) ||
      card.suit === game.trump
  );
  console.log(validAiCards);

  const opponentCardsCount =
    game.players.find(({ user }) => user._id !== OPEN_AI_PLAYER_ID)?.cardIds
      .length || 0;
  const trumpSymbol = convertSuitToSymbol(game.trump);

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0.2,
    messages: [
      {
        role: "system",
        content: AI_SYSTEM_DEFENSE.replace("{{trumpSymbol}}", trumpSymbol),
      },
      {
        role: "user",
        content: `
      Trump: ${trumpSymbol}, 
      Remaining cards count: ${game.deck.length}
      Opponent's card count: ${opponentCardsCount}
      Your cards: ${JSON.stringify(validAiCards)}
      
      What to play?`,
      },
    ],
  });

  const aiAnswer = response?.choices[0].message.content?.trim();
  console.log(aiAnswer);

  const aiAnswerCard = validAiCards.find(
    ({ textValue }) => textValue === aiAnswer
  );

  if (aiAnswerCard) return aiAnswerCard;
  if (aiAnswer?.toLowerCase().includes("take")) return null;
  return null;
};
