import { memo } from "react";
import {
  StyledCardWrapper,
  StyledPlayerCards,
  StyledCardsWrapper,
} from "./styles";
import { Card } from "../../../../ui";

export const PlayerCards = memo(() => {
  const array = [-2.5, -1.5, -0.5, 0.5, 1.5, 2.5];
  const array2 = [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6];

  return (
    <StyledCardsWrapper>
      <StyledPlayerCards>
        {array2.map((i, index) => (
          <StyledCardWrapper index={i} key={i}>
            <Card id={20 + index} />
          </StyledCardWrapper>
        ))}
      </StyledPlayerCards>
    </StyledCardsWrapper>
  );
});
