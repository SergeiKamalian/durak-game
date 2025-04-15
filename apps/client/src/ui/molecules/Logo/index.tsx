import { memo } from "react";

import { Image, Text, Wrapper } from "../../atoms";
import { useTheme } from "styled-components";
import { StyledLogo } from "./styles";

interface LogoProps {
  size?: "large" | "small" | "medium";
}

export const Logo = memo((props: LogoProps) => {
  const { size = "small" } = props;
  const theme = useTheme();

  return (
    <StyledLogo $size={size}>
      <Wrapper padding="0" gap={15}>
        <Image
          alt="logo"
          height="70px"
          width="auto"
          url={"../../../../logo.png"}
        />
        <Wrapper padding="0" direction="column" justifyContent="center">
          <Text fw={700} fz={30} lh={25}>
            DURAK
          </Text>
          <Text color={theme.colors.purpleLight} fw={400} lh={10} ls={8}>
            ONLINE
          </Text>
        </Wrapper>
      </Wrapper>
    </StyledLogo>
  );
});
