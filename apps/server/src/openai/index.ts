import OpenAI from "openai";
import {
  Game,
  getCardById,
  OPEN_AI_PLAYER_ID,
} from "../../../../packages/shared";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY!,
});

export const getOpenaiAttackingMove = async (game: Game) => {
  try {
    console.log("attacker move");

    console.log(game);

    const tableCards = game.table
      .flatMap(([id1, id2]) => [id1, id2])
      .filter((id): id is number => id !== undefined)
      .map(getCardById);

    const aiCards = (
      game.players.find(({ user }) => user._id === OPEN_AI_PLAYER_ID) ||
      game.players[0]
    ).cardIds.map(getCardById);
    console.log(aiCards);

    const opponentCardsCount =
      game.players.find(({ user }) => user._id !== OPEN_AI_PLAYER_ID)?.cardIds
        .length || 0;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 1.0,
      messages: [
        {
          role: "system",
          content: `You are the AI logic for the card game "Durak". Your task is to choose a card to attack.
            - The trump card is powerful, but do not use it unless necessary. Save it for crucial moments when it guarantees a win or for defense.
            - Start with low-ranked cards to avoid wasting strong ones too early. Weak cards are useful for testing the opponent's response.
            - If the table is empty, play any card you can to begin the attack.
            - When choosing a card to attack, prioritize those that have a good chance of beating the opponent's cards already on the table. If you have multiple choices, go for the one with the highest value that still fits the situation.
            - If you have no cards that can beat the opponent's card(s), try to use cards with the same suit but lower value to pressure them, unless you are holding a trump card.
            - If you are confident your opponent cannot beat your card, use your strongest available card to force them to defend.
            - Do not waste your trump card unless it's essential to win the round. If your trump card is your only option to win, use it wisely.
            - If no valid attack is possible, say "pass". Be strategic about when you pass; do not pass if you still have a valid move.
            Respond with one line: either the card you can play (in the format "6♥"), or "pass" if the move is not possible.`,
        },
        {
          role: "user",
          content: `
Trump: ${game.trump}, 
Remaining cards count: ${game.deck.length}
Opponent's card count: ${opponentCardsCount}
Your cards: ${JSON.stringify(aiCards)}
 
What to play?`,
        },
      ],
    });
    const aiAnswer = response?.choices[0].message.content?.trim();
    console.log("Наш ход:", aiAnswer);
  } catch (error) {
    return error;
  }
  return 0;
};
