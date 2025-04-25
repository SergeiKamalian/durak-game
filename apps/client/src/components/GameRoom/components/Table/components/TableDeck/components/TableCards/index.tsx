import { memo } from "react";
import { StyledCards, StyledCardsWrapper } from "./styles";
import { Card } from "../../../../../../../../ui";
import { useAiGame } from "../../../../../../../../context";

interface TableCardsProps {
  cards: [number, number | undefined];
}

export const TableCards = memo((props: TableCardsProps) => {
  const { cards } = props;

  const { beatCardHandler } = useAiGame();

  return (
    <StyledCardsWrapper>
      <StyledCards>
        <Card
          id={cards[0]}
          onClick={cards[1] ? undefined : () => beatCardHandler(cards[0])}
        />
        {!!cards[1] && <Card id={cards[1]} />}
      </StyledCards>
    </StyledCardsWrapper>
  );
});
