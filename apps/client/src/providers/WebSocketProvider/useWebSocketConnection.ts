import { useState, useEffect, useCallback } from "react";
import useWebSocket from "react-use-websocket";

interface Message {
  type: string;
  content: string;
}

interface WebSocketConnection {
  sendChatMessage: (message: string) => void;
  sendGameMessage: (message: string) => void;
  chatMessages: string[];
  gameMessages: string[];
  readyState: number;
}

const WS_URL = `ws://localhost:8000`;

export const useWebSocketConnection = (): WebSocketConnection => {
  const { sendMessage, lastMessage, readyState } = useWebSocket(WS_URL);
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [gameMessages, setGameMessages] = useState<string[]>([]);

  useEffect(() => {
    if (lastMessage) {
      const message: Message = JSON.parse(lastMessage.data);

      switch (message.type) {
        case "chat":
          setChatMessages((prev) => [...prev, message.content]);
          break;
        case "game":
          setGameMessages((prev) => [...prev, message.content]);
          break;
        default:
          console.log("Unknown message type:", message);
      }
    }
  }, [lastMessage]);

  const sendChatMessage = useCallback(
    (message: string) => {
      sendMessage(JSON.stringify({ type: "chat", content: message }));
    },
    [sendMessage]
  );

  const sendGameMessage = useCallback(
    (message: string) => {
      sendMessage(JSON.stringify({ type: "game", content: message }));
    },
    [sendMessage]
  );

  return {
    sendChatMessage,
    sendGameMessage,
    chatMessages,
    gameMessages,
    readyState,
  };
};
