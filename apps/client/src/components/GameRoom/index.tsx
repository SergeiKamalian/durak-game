import { memo } from "react";
import { Wrapper } from "../../ui";
import { PlayerCards, Table } from "./components";
import { useAIGameSelector } from "../../store";
import { useGameRoom } from "./hooks";

export const GameRoom = memo(() => {
  const { aiGame } = useAIGameSelector();

  useGameRoom();

  return (
    <Wrapper
      minWidth="100svw"
      minHeight="100svh"
      background="linear-gradient(145deg,rgba(58, 79, 106, 1) 0%, rgba(40, 57, 89, 1) 100%)"
      alignItems="center"
      justifyContent="center"
    >
      <div style={{ maxWidth: 200, position: "absolute", left: 0 }}>
        <p>attacker: {aiGame?.attackingPlayerId}</p>
        <p>defender: {aiGame?.defendingPlayerId}</p>
        <p>time: {aiGame?.turnMaxTime}</p>
      </div>
      <Table />
      <PlayerCards />
    </Wrapper>
  );
});
