import { memo } from "react";
import { StyledCards, StyledCardsWrapper } from "./styles";
import { Card } from "../../../../../../../../ui";

export const TableCards = memo(() => {
  return (
    <StyledCardsWrapper>
      <StyledCards>
        <Card id={23} />
        <Card id={25} />
      </StyledCards>
    </StyledCardsWrapper>
  );
});
