import { memo } from "react";
import { StyledTableDeck } from "./styles";

import { TableCards } from "./components";

export const TableDeck = memo(() => {
  return (
    <StyledTableDeck>
      <TableCards />
      <TableCards />
      <TableCards />

      <TableCards />

      <TableCards />

      <TableCards />
    </StyledTableDeck>
  );
});
