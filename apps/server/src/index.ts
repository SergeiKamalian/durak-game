import "dotenv/config";
import express from "express";
import WebSocket, { WebSocketServer } from "ws";
import cors from "cors";
import http from "http";
import url from "url";
import usersRoute from "./routes/users";
import { setupWebSocket } from "./ws";

const PORT = process.env.PORT;
const app = express();

const server = http.createServer(app);

app.use(express.json());
app.use(cors());

app.use("/users", usersRoute);

setupWebSocket(server);

server.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
