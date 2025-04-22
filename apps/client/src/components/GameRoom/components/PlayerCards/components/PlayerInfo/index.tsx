import { memo, useState } from "react";
import { StyledName, StyledOpponentImage, StyledPlayerInfo } from "./styles";
import { RadialProgressBar } from "../../../../../../ui";

export const PlayerInfo = memo(() => {
  const [progress, setProgress] = useState(100);

  return (
    <StyledPlayerInfo>
      <RadialProgressBar value={progress} />
      <StyledOpponentImage
        src="https://i.pinimg.com/736x/23/9d/3d/239d3de341dd3ef0690c596e4e825d87.jpg"
        alt="Player NAME"
      />

      <StyledName>Guest</StyledName>
    </StyledPlayerInfo>
  );
});
