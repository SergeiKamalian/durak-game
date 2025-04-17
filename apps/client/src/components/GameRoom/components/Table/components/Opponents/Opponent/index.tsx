import { memo, useMemo } from "react";
import {
  StyledBackCardItem,
  StyledName,
  StyledOpponent,
  StyledOpponentCards,
  StyledOpponentImage,
} from "./styles";
import { playersCardsPositions } from "../../../../../../../constants";
import { Card } from "../../../../../../../ui";

interface OpponentProps {
  allPlayersCount: 2 | 3 | 4 | 5 | 6;
  opponentIndex: 0 | 1 | 2 | 4 | 4;
}

export const Opponent = memo((props: OpponentProps) => {
  const { allPlayersCount, opponentIndex } = props;
  const cardsStyles = useMemo(
    () => playersCardsPositions[allPlayersCount][opponentIndex],
    [allPlayersCount, opponentIndex]
  );

  return (
    <StyledOpponent>
      <StyledOpponentImage
        alt="Opponent name"
        src="https://i.pinimg.com/736x/23/9d/3d/239d3de341dd3ef0690c596e4e825d87.jpg"
      />

      <StyledName>Sergo</StyledName>
      <StyledOpponentCards $cardsCount={5} style={{ ...cardsStyles }}>
        {new Array(5).fill(null).map((_, i) => (
          <StyledBackCardItem $index={i} key={i}>
            <Card isBack />
          </StyledBackCardItem>
        ))}
      </StyledOpponentCards>
    </StyledOpponent>
  );
});
