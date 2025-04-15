import "dotenv/config";
import express from "express";
import WebSocket, { WebSocketServer } from "ws";
import cors from "cors";
import http from "http";
import usersRoute from "./routes/users";
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
