import { memo, useMemo } from "react";
import {
  StyledBackCard,
  StyledBgImage,
  StyledCard,
  StyledRank,
  StyledRotatedValues,
  StyledSuit,
  StyledValues,
} from "./styles";
import { getCardById } from "../../../../../../packages/shared";

interface CardProps {
  isBack?: boolean;
  id?: number;
}

export const Card = memo((props: CardProps) => {
  const { id, isBack } = props;

  const cardValues = useMemo(() => {
    if (!isBack) return getCardById(id || 0);
    else return null;
  }, [id, isBack]);

  if (isBack)
    return (
      <StyledBackCard>
        {" "}
        <img src="../../../../suits/dotes.svg" alt="" />{" "}
      </StyledBackCard>
    );

  return (
    <StyledCard>
      <StyledValues>
        <StyledRank>{cardValues?.rank}</StyledRank>
        <StyledSuit
          src={`../../../../suits/${cardValues?.suit}.svg`}
          alt={cardValues?.suit}
        />
      </StyledValues>
      <StyledRotatedValues>
        <StyledRank>{cardValues?.rank}</StyledRank>
        <StyledSuit
          src={`../../../../suits/${cardValues?.suit}.svg`}
          alt={cardValues?.suit}
        />
      </StyledRotatedValues>
      <StyledBgImage src="../../../../suits/dotes_2.svg" alt="Bg" />
    </StyledCard>
  );
});
