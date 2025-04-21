import { memo, useEffect, useMemo, useState } from "react";
import { generatePlayersTablePositions } from "../../../../../../ui";
import { StyledOpponentPosition, StyledOpponents } from "./styles";
import { Opponent } from "./Opponent";
import { useAIGameSelector, useAuthSelector } from "../../../../../../store";
import { getGuestId } from "../../../../../../utils";
import { TABLE_HEIGHT, TABLE_WIDTH } from "../../../../../../constants";

export const Opponents = memo(() => {
  const { isAuth } = useAuthSelector();
  const { aiGame } = useAIGameSelector();

  const opponents = useMemo(() => {
    if (!isAuth)
      return (
        aiGame?.players.filter((player) => player.user._id !== getGuestId()) ||
        []
      );
    else return [];
  }, [aiGame?.players, isAuth]);

  const [size, setSize] = useState({
    innerWidth: window.innerWidth * 0.65,
    innerHeight: window.innerHeight * 0.65,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        innerWidth: (window.innerWidth * TABLE_WIDTH) / 100,
        innerHeight: (window.innerHeight * TABLE_HEIGHT) / 100,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const opponentsPositions = generatePlayersTablePositions(
    aiGame?.playersCount || 0,
    size.innerHeight,
    size.innerWidth
  );

  return (
    <StyledOpponents>
      {opponentsPositions.map((position, index) => (
        <StyledOpponentPosition style={position} key={index}>
          <Opponent
            allPlayersCount={aiGame?.playersCount || 2}
            opponentIndex={index as 0}
            player={opponents[index]}
          />
        </StyledOpponentPosition>
      ))}
    </StyledOpponents>
  );
});
