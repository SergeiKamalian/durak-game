import { memo, useMemo } from "react";
import {
  StyledCardWrapper,
  StyledPlayerCards,
  StyledCardsWrapper,
} from "./styles";
import { Card } from "../../../../ui";
import { useAIGameSelector } from "../../../../store";
import {
  getCardsPositions,
  getGuestId,
  sortUserCards,
} from "../../../../utils";
import { PlayerController, PlayerInfo } from "./components";

export const PlayerCards = memo(() => {
  const { aiGame } = useAIGameSelector();

  const player = useMemo(
    () => aiGame?.players.find((player) => player.user._id === getGuestId()),
    [aiGame?.players]
  );

  const gameIsStarted = aiGame?.status === "active";

  const { cardsPositions, playerCards } = useMemo(() => {
    const cardsPositions = getCardsPositions(player!.cardIds!.length);
    const playerCards = sortUserCards(player!.cardIds, aiGame!.trump);
    return {
      cardsPositions,
      playerCards,
    };
  }, [aiGame, player]);

  if (!player) return;

  return (
    <StyledCardsWrapper>
      <PlayerInfo />
      <PlayerController playerPosition="start" />
      {gameIsStarted ? (
        <StyledPlayerCards>
          {cardsPositions.map((i, index) => {
            const cardId = playerCards[index];
            return (
              <StyledCardWrapper $index={i} key={i}>
                <Card id={cardId} />
              </StyledCardWrapper>
            );
          })}
        </StyledPlayerCards>
      ) : null}
      {gameIsStarted ? <PlayerController playerPosition="defender" /> : null}
    </StyledCardsWrapper>
  );
});
