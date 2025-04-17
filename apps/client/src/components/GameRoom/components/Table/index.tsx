import { memo } from "react";
import { StyledCards, StyledTable, StyledTableInner } from "./styles";
import { Card } from "../../../../ui";
import { PlayerCards } from "../PlayerCards";

export const Table = memo(() => {
  return (
    <StyledTable>
      <StyledTableInner>
        <StyledCards>
          <Card id={23} />
          <Card id={25} />
        </StyledCards>
        <Card isBack />
        <PlayerCards />
      </StyledTableInner>
    </StyledTable>
  );
});
