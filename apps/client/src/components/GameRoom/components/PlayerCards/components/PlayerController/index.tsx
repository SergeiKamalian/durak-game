import { memo, useMemo } from "react";
import { StyledPlayerController, StyledPlayerControllerItem } from "./styles";
import { Text } from "../../../../../../ui";
import { useAiGame } from "../../../../../../context";

interface PlayerControllerProps {
  isPlayerTurn: boolean;
  playerIsAttacker: boolean;
  playerIsDefender: boolean;
}

export const PlayerController = memo((props: PlayerControllerProps) => {
  const { isPlayerTurn, playerIsAttacker } = props;

  const { passHandler } = useAiGame();

  const component = useMemo(() => {
    if (!isPlayerTurn)
      return (
        <Text fz={20} fw={700}>
          It's not your turn
        </Text>
      );

    return (
      <StyledPlayerControllerItem
        onClick={playerIsAttacker ? passHandler : console.log}
        $type={playerIsAttacker ? "attacker" : "defender"}
      >
        {playerIsAttacker ? "Pass" : "I take"}
      </StyledPlayerControllerItem>
    );
  }, [isPlayerTurn, passHandler, playerIsAttacker]);

  return (
    <StyledPlayerController $isStart={false}>
      {component}
    </StyledPlayerController>
  );
});
