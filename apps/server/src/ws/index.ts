import { WebSocketServer, WebSocket } from "ws";
import url from "url";
import { onWsMessage } from "./controllers";
import { WS_ONLINE_USERS } from "./data";
import http from "http";

export * from "./data";

export function setupWebSocket(
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>
) {
  const wsServer = new WebSocketServer({ server });

  wsServer.on("connection", (socket, request) => {
    const { userId } = url.parse(request.url!, true).query;

    if (!userId) {
      socket.close();
      return;
    }

    WS_ONLINE_USERS.set(userId as string, socket);

    socket.on("message", (message) => onWsMessage(message, socket));

    socket.on("close", () => WS_ONLINE_USERS.delete(userId as string));
  });

  return wsServer;
}
