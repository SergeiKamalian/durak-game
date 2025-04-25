import "dotenv/config";
import express from "express";
import cors from "cors";
import http from "http";
import { AIGameRoute, usersRoute, GAME_ROUTE } from "./routes";

import { setupWebSocket } from "./ws";
import { connectDB } from "./database/db";

const PORT = process.env.PORT || 8000;

const app = express();
const server = http.createServer(app);

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/users", usersRoute);
app.use("/ai-game", AIGameRoute);

// new
app.use("/game", GAME_ROUTE);

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
