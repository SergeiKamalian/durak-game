import { memo, useMemo } from "react";
import {
  StyedRemainingDeck,
  StyledBackCards,
  StyledCountWrapper,
  StyledTrump,
} from "./styles";
import { Card, Text } from "../../../../../../ui";
import { useAIGameSelector } from "../../../../../../store";

export const RemainingDeck = memo(() => {
  const { aiGame } = useAIGameSelector();
  const trump = useMemo(() => aiGame!.deck[aiGame!.deck.length - 1], [aiGame]);

  return (
    <StyedRemainingDeck>
      <StyledCountWrapper>
        <Text fz={30}>{aiGame?.deck.length}</Text>
      </StyledCountWrapper>
      <StyledBackCards>
        <Card isBack />
        <Card isBack />
      </StyledBackCards>
      <StyledTrump>
        <Card id={trump} />
      </StyledTrump>
    </StyedRemainingDeck>
  );
});
