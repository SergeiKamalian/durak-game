import WebSocket from "ws";

export const WS_ONLINE_USERS = new Map<string, WebSocket>();

export const WS_PERSONAL_CHATS = new Map<
  string,
  {
    users: Set<WebSocket>;
    messages: Set<{
      messageId: string;
      message: string;
      senderId: string;
      sendedAt: Date;
    }>;
  }
>();
