import "dotenv/config";
import express from "express";
import WebSocket, { WebSocketServer } from "ws";
import cors from "cors";
import http from "http";
import usersRoute from "./routes/users";
import { setupWebSocket } from "./ws";
import { connectDB } from "./database/db";
import { OpenAI } from "openai";
const openai = new OpenAI({
  apiKey:
    "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",
});

// export async function getOpenAIResponse() {
//   try {
//     const response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       temperature: 0.2,
//       max_tokens: 100,
//       messages: [
//         {
//           role: "system",
//           content: `You are a logic engine for the card game "Durak". Your task is to either 1) choose the next card to attack with, or 2) say "pass" if no valid card is available.
//             Please follow these steps before responding:
//             1. Look at the list of cards available to you (availableCards).
//             2. Check if the rank of the card (e.g., '6', 'K', 'T') is present in the list of valid attack cards (validAttackCards).
//             3. If there is a valid card, choose that card to attack.
//             4. If there is no valid card, say "pass".
//             Your response should be a short JSON object like this:
//             { "action": "attack", "card": "K♦" } if you are attacking with a card,
//             or { "action": "pass" } if you are passing.`,
//         },
//         {
//           role: "user",
//           content: JSON.stringify({
//             trumpCard: "♠",
//             remainingDeck: 5,
//             opponentCards: 3,
//             tableCards: [
//               { card: "6♥", coveredBy: "9♥" },
//               { card: "9♦", coveredBy: "Д♦" },
//             ],
//             availableCards: ["7♠", "Д♠", "K♥"],
//             validAttackCards: ["6", "9", "T"],
//           }),
//         },
//       ],
//     });

//     let aiAnswer = response.choices[0].message.content?.trim();
//     console.log({ aiAnswer });

//     // Check if the answer is valid (belongs to the valid attack cards)
//     const validCards = ["6", "9", "K", "T"]; // Valid attack cards
//     const cardRegex = /([6,9,K,T])([♥♦♠♣])/; // Check if the card is in valid format (with suit)

//     let result;

//     if (
//       aiAnswer &&
//       !validCards.some(
//         (card) => aiAnswer.includes(card) && cardRegex.test(aiAnswer)
//       )
//     ) {
//       result = { action: "pass" }; // If card is not valid, return "pass"
//     } else {
//       result = { action: "attack", card: aiAnswer }; // If valid, return the card to attack with
//     }

//     console.log("Our move:", result);
//     return result;
//   } catch (error) {
//     console.error("❌ Error while making the request to OpenAI:", error);
//     throw error;
//   }
// }

// getOpenAIResponse();

const PORT = process.env.PORT || 8000;

const app = express();
const server = http.createServer(app);

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/users", usersRoute);

// WebSocket
setupWebSocket(server);

// MongoDB + Start server
connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to DB:", err);
    process.exit(1);
  });
