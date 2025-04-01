export enum WS_CHAT_ACTIONS {
  JOIN = "JOIN",
  LEAVE = "LEAVE",
  SEND = "SEND",
  DELETE = "DELETE",
}

export type WS_CHAT_JOIN_MESSAGE = {
  action: WS_CHAT_ACTIONS.JOIN;
  currentUserId: number;
  user2Id: number;
};

export type WS_CHAT_LEAVE_MESSAGE = {
  chatId: string;
  currentUserId: number;
  action: WS_CHAT_ACTIONS.LEAVE;
};

export type WS_CHAT_SEND_MESSAGE = {
  action: WS_CHAT_ACTIONS.SEND;
  message: string;
};

export type WS_CHAT_DELETE_MESSAGE = {
  action: WS_CHAT_ACTIONS.DELETE;
  messageId: number;
};
