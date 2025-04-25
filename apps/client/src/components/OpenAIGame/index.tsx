import { memo, useCallback } from "react";
import { StyledAIBtn, StyledImage } from "./styles";
import { Image, Text, Wrapper } from "../../ui";
import { handleError } from "../../handlers";
import { AIGameService, GameService } from "../../api";
import { useAIGameActions, useAppActions } from "../../store";
import { startGameWithAI } from "../../utils";

export const OpenAIGame = memo(() => {
  const { setAppLoadingStatus } = useAppActions();
  const { setAIGame } = useAIGameActions();
  // const startGameWithAi = useCallback(async () => {
  //   try {
  //     setAppLoadingStatus(true);
  //     const gameRes = await AIGameService.createGame();
  //     setAIGame(gameRes);
  //     startGameWithAI();
  //   } catch (error) {
  //     handleError(error);
  //   } finally {
  //     setAppLoadingStatus(false);
  //   }
  // }, [setAppLoadingStatus, setAIGame]);

  const x = async () => {
    const gameRes = await GameService.createGameRoom();
  };

  return (
    <StyledAIBtn onClick={x}>
      <Wrapper
        withAnimation
        background={"#12141ec2"}
        border={"1px solid #7a788130"}
        blur="10px"
        padding="20px"
        direction="row"
        minWidth="450px"
        borderRadius="30px"
        alignItems="center"
        withBoxShadow
        minHeight="40px"
        maxHeight="40px"
      >
        <Text cursor="pointer" fz={26}>
          Play with{" "}
          <Text cursor="pointer" fw={600} type="span" color="#0ca37f">
            OpenAI
          </Text>
        </Text>
        <StyledImage>
          <Image
            url="../../../../openai.png"
            width="70px"
            height="70px"
            alt="openAi"
          />
        </StyledImage>
      </Wrapper>
    </StyledAIBtn>
  );
});
