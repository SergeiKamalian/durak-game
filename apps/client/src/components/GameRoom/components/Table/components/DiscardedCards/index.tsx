import { memo } from "react";
import { StyledDiscardedCards } from "./styles";
import { Card } from "../../../../../../ui";

const getRandomRotation = () => {
  const min = -180;
  const max = 180;
  return +(Math.random() * (max - min) + min).toFixed(1);
};

export const DiscardedCards = memo(() => {
  const cards = Array.from({ length: 5 }, () => getRandomRotation());

  return (
    <StyledDiscardedCards>
      {cards.map((rotate, index) => (
        <div
          style={{ position: "absolute", transform: `rotate(-${rotate}deg)` }}
        >
          <Card key={index} isBack />
        </div>
      ))}
    </StyledDiscardedCards>
  );
});
