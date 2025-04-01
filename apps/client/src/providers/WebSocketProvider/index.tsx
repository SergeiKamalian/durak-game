import React from "react";
import { useWebSocketConnection } from "./useWebSocketConnection";

const WebSocketComponent: React.FC = () => {
  const {
    sendChatMessage,
    sendGameMessage,
    chatMessages,
    gameMessages,
    readyState,
  } = useWebSocketConnection();

  return (
    <div>
      <h2>Chat Messages</h2>
      <ul>
        {chatMessages.map((msg, idx) => (
          <li key={idx}>{msg}</li>
        ))}
      </ul>
      <button onClick={() => sendChatMessage("Hello Chat!")}>
        Send Chat Message
      </button>

      <h2>Game Messages</h2>
      <ul>
        {gameMessages.map((msg, idx) => (
          <li key={idx}>{msg}</li>
        ))}
      </ul>
      <button onClick={() => sendGameMessage("New Game Move!")}>
        Send Game Message
      </button>

      <div>WebSocket state: {readyState}</div>
    </div>
  );
};

export default WebSocketComponent;
