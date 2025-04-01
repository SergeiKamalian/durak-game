import WebSocket from "ws";

import {
  getChatId,
  WS_CHAT_ACTIONS,
  WS_CHAT_JOIN_MESSAGE,
  WS_CHAT_LEAVE_MESSAGE,
} from "../../../../../packages/shared";
import { WsChatMessage } from "../types";
import { WS_PERSONAL_CHATS } from "../data";

export const chatController = (message: WsChatMessage, socket: WebSocket) => {
  switch (message.action) {
    case WS_CHAT_ACTIONS.JOIN:
      joinChat(message, socket);
      break;
    case WS_CHAT_ACTIONS.LEAVE:
      leaveChat(message, socket);
      break;
    default:
      break;
  }

  console.log(WS_PERSONAL_CHATS);
};

const joinChat = (message: WS_CHAT_JOIN_MESSAGE, socket: WebSocket) => {
  const { currentUserId, user2Id } = message;
  const chatId = getChatId(currentUserId, user2Id);
  if (!WS_PERSONAL_CHATS.has(chatId)) {
    WS_PERSONAL_CHATS.set(chatId, {
      users: new Set<WebSocket>(),
      messages: new Set(),
    });
  }
  const chat = WS_PERSONAL_CHATS.get(chatId);
  if (chat) chat.users.add(socket);

  chat?.users.forEach((user) => {
    const chatActiveUsers = Array.from(chat?.users);
    const chatMessages = Array.from(chat?.messages);
    user.send(
      JSON.stringify({
        chatId,
        users: chatActiveUsers,
        messages: chatMessages,
        type: WS_CHAT_ACTIONS.JOIN,
      })
    );
  });
};

const leaveChat = (message: WS_CHAT_LEAVE_MESSAGE, socket: WebSocket) => {
  const { currentUserId, chatId } = message;

  const chat = WS_PERSONAL_CHATS.get(chatId);
  if (!chat) return;

  chat.users.delete(socket);
  console.log({ size: chat.users.size });
};
