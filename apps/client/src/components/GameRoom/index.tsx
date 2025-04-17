import { memo } from "react";
import { Wrapper } from "../../ui";
import { PlayerCards, Table } from "./components";

export const GameRoom = memo(() => {
  return (
    <Wrapper
      minWidth="100svw"
      minHeight="100svh"
      background="linear-gradient(145deg,rgba(58, 79, 106, 1) 0%, rgba(40, 57, 89, 1) 100%)"
      alignItems="center"
      justifyContent="center"
    >
      <Table />
      {/* <PlayerCards /> */}
    </Wrapper>
  );
});
