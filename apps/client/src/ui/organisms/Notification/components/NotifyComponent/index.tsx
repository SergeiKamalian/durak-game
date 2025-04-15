import { memo } from "react";
import { NotifyProps } from "../..";
import { StyledImage, StyledLines, StyledNotificationWrapper } from "./styles";
import { Text } from "../../../../atoms";

export const NotifyComponent = memo((props: NotifyProps) => {
  const { message } = props;
  return (
    <StyledNotificationWrapper>
      <StyledImage alt="Logo" src="../../../../../../logo.png" />
      <StyledLines />
      <Text align="center" fz={18} fw={600} color="#b3a582">
        {message}
      </Text>
    </StyledNotificationWrapper>
  );
});
