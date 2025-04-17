import { memo } from "react";
import {
  StyledCards,
  StyledDeck,
  StyledTable,
  StyledTableInner,
} from "./styles";
import { Card } from "../../../../ui";

import { Opponents } from "./components";

export const Table = memo(() => {
  return (
    <StyledTable>
      <Opponents />

      <StyledTableInner>
        <StyledDeck>
          <StyledCards>
            <Card id={23} />
            <Card id={25} />
          </StyledCards>
          <StyledCards>
            <Card id={23} />
            <Card id={25} />
          </StyledCards>
          <StyledCards>
            <Card id={23} />
            <Card id={25} />
          </StyledCards>
          <StyledCards>
            <Card id={23} />
            <Card id={25} />
          </StyledCards>
          <StyledCards>
            <Card id={23} />
            <Card id={25} />
          </StyledCards>
          <StyledCards>
            <Card id={23} />
            <Card id={25} />
          </StyledCards>
        </StyledDeck>
        {/* <StyledCards>
          <Card id={23} />
          <Card id={25} />
        </StyledCards>
        <StyledCards>
          <Card id={23} />
          <Card id={25} />
        </StyledCards>
        <StyledCards>
          <Card id={23} />
          <Card id={25} />
        </StyledCards>
        <StyledCards>
          <Card id={23} />
          <Card id={25} />
        </StyledCards>
        <StyledCards>
          <Card id={23} />
          <Card id={25} />
        </StyledCards>
        <StyledCards style={{ margin: 0 }}>
          <Card id={23} />
          <Card id={25} />
        </StyledCards> */}
      </StyledTableInner>
    </StyledTable>
  );
});
