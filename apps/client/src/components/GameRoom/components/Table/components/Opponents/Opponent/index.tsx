import { memo, useMemo } from "react";
import {
  StyledBackCardItem,
  StyledName,
  StyledOpponent,
  StyledOpponentCards,
  StyledOpponentImage,
} from "./styles";
import { playersCardsPositions } from "../../../../../../../constants";
import { Card, Text } from "../../../../../../../ui";
import { Player } from "../../../../../../../../../../packages/shared";

interface OpponentProps {
  allPlayersCount: 2 | 3 | 4 | 5 | 6;
  opponentIndex: 0 | 1 | 2 | 4 | 4;
  player: Player;
}

export const Opponent = memo((props: OpponentProps) => {
  const { allPlayersCount, opponentIndex, player } = props;
  const cardsStyles = useMemo(
    () => playersCardsPositions[allPlayersCount][opponentIndex],
    [allPlayersCount, opponentIndex]
  );

  if (!player) return;

  return (
    <StyledOpponent>
      <StyledOpponentImage
        alt="Opponent name"
        src={
          player.user._id === "OpenAI"
            ? "../../../../../../../../openai.png"
            : "https://i.pinimg.com/736x/23/9d/3d/239d3de341dd3ef0690c596e4e825d87.jpg"
        }
      />

      <StyledName>{player.user.name}</StyledName>
      <StyledOpponentCards
        $cardsCount={player.cardIds.length > 6 ? 6 : player.cardIds.length}
        style={{ ...cardsStyles }}
      >
        <Text style={{ position: "relative", zIndex: 2 }} fz={30}>
          {player.cardIds.length}
        </Text>
        {new Array(player.cardIds.length > 6 ? 6 : player.cardIds.length)
          .fill(null)
          .map((_, i) => (
            <StyledBackCardItem $index={i} key={i}>
              <Card isBack />
            </StyledBackCardItem>
          ))}
      </StyledOpponentCards>
    </StyledOpponent>
  );
});
