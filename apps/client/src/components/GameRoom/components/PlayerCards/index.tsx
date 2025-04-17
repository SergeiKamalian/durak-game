import { memo } from "react";
import { StyledDiv, StyledPlayerCards, StyledCardsWrapper } from "./styles";
import { Card } from "../../../../ui";

export const PlayerCards = memo(() => {
  const array = [-2.5, -1.5, -0.5, 0.5, 1.5, 2.5];
  const array2 = [-4, -3, -2, -1, 0, 1, 2, 3, 4];

  return (
    <StyledCardsWrapper>
      <StyledPlayerCards>
        {array2.map((i, index) => (
          <StyledDiv index={i} key={i}>
            <Card id={20 + index} />
          </StyledDiv>
        ))}
      </StyledPlayerCards>
    </StyledCardsWrapper>
  );
});
