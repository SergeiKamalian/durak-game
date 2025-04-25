import { memo } from "react";
import { StyledTableDeck } from "./styles";

import { TableCards } from "./components";
import { useAIGameSelector } from "../../../../../../store";

export const TableDeck = memo(() => {
  const { aiGame } = useAIGameSelector();
  return (
    <StyledTableDeck>
      {aiGame?.table.map((cards, index) => (
        <TableCards key={index} cards={cards} />
      ))}
    </StyledTableDeck>
  );
});
