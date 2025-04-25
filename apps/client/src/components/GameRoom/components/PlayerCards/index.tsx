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
import { useAiGame } from "../../../../context";

export const PlayerCards = memo(() => {
  const { aiGame } = useAIGameSelector();
  const { selectPlayerCardHandler, playerSelectedCardId } = useAiGame();

  const player = useMemo(
    () => aiGame?.players.find((player) => player.user._id === getGuestId()),
    [aiGame?.players]
  );

  const gameIsStarted = aiGame?.status === "active";

  const isPlayerTurn = player?.user._id === aiGame?.turnPlayerId;
  const playerIsAttacker = aiGame?.attackingPlayerId === player?.user._id;
  const playerIsDefender = aiGame?.defendingPlayerId === player?.user._id;

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
      {gameIsStarted ? (
        <StyledPlayerCards>
          {cardsPositions.map((i, index) => {
            const cardId = playerCards[index];
            return (
              <StyledCardWrapper
                $index={i}
                key={i}
                $isSelected={playerSelectedCardId === cardId}
              >
                <Card
                  onClick={() => selectPlayerCardHandler(cardId)}
                  id={cardId}
                />
              </StyledCardWrapper>
            );
          })}
        </StyledPlayerCards>
      ) : null}
      {isPlayerTurn ? (
        <PlayerController
          isPlayerTurn={isPlayerTurn}
          playerIsAttacker={playerIsAttacker}
          playerIsDefender={playerIsDefender}
        />
      ) : null}
    </StyledCardsWrapper>
  );
});
