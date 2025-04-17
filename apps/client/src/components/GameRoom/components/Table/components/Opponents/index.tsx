import { memo, useEffect, useState } from "react";
import { generatePlayersTablePositions } from "../../../../../../ui";
import { StyledOpponentPosition, StyledOpponents } from "./styles";
import { Opponent } from "./Opponent";
const count = 6;
export const Opponents = memo(() => {
  const [size, setSize] = useState({
    innerWidth: window.innerWidth * 0.65,
    innerHeight: window.innerHeight * 0.65,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        innerWidth: window.innerWidth * 0.65,
        innerHeight: window.innerHeight * 0.65,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const opponentsPositions = generatePlayersTablePositions(
    count,
    size.innerHeight,
    size.innerWidth
  );

  return (
    <StyledOpponents>
      {opponentsPositions.map((position, index) => (
        <StyledOpponentPosition style={position} key={index}>
          <Opponent allPlayersCount={count} opponentIndex={index as 0} />
        </StyledOpponentPosition>
      ))}
    </StyledOpponents>
  );
});
