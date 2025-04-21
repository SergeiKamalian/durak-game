import { memo } from "react";
import { StyledTable, StyledTableInner } from "./styles";

import {
  DiscardedCards,
  Opponents,
  RemainingDeck,
  TableDeck,
} from "./components";

export const Table = memo(() => {
  return (
    <StyledTable>
      <Opponents />

      <StyledTableInner>
        <RemainingDeck />
        <DiscardedCards />
        <TableDeck />
      </StyledTableInner>
    </StyledTable>
  );
});
