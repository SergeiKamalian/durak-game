import WebSocket from "ws";
import { WEB_SOCKET_TYPES } from "../../../../../packages/shared";
import { chatController } from "./chatController";

export const onWsMessage = (message: WebSocket.RawData, socket: WebSocket) => {
  const parsedMessage = JSON.parse(message.toString());
  const actionType = parsedMessage.type as keyof typeof WEB_SOCKET_TYPES;

  switch (actionType) {
    case WEB_SOCKET_TYPES.PERSONAL_CHAT:
      chatController(parsedMessage, socket);
      break;

    default:
      break;
  }
};
