import { memo, useMemo } from "react";
import {
  StyledPlayerController,
  StyledPlayerControllerItem,
  StyledStartGame,
} from "./styles";
import { Text } from "../../../../../../ui";

interface PlayerControllerProps {
  playerPosition: "attacker" | "defender" | "default" | "start";
}

export const PlayerController = memo((props: PlayerControllerProps) => {
  const { playerPosition } = props;

  const component = useMemo(() => {
    if (playerPosition === "default")
      return (
        <Text fz={20} fw={700}>
          {" "}
          It's not your turn
        </Text>
      );

    if (playerPosition === "start") {
      return <StyledStartGame>Start game</StyledStartGame>;
    }

    return (
      <StyledPlayerControllerItem $type={playerPosition}>
        {playerPosition === "attacker" ? "Pass" : "I take"}
      </StyledPlayerControllerItem>
    );
  }, [playerPosition]);

  return (
    <StyledPlayerController $isStart={playerPosition === "start"}>
      {component}
    </StyledPlayerController>
  );
});
