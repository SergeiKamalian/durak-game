import { memo } from "react";
import { Button, Text, Wrapper } from "../../ui";
import { useProfile } from "./useProfile";
import { OpenAIGame } from "../../components";

export const Profile = memo(() => {
  const { logout } = useProfile();
  return (
    <Wrapper
      minWidth="100svw"
      minHeight="100svh"
      alignItems="center"
      justifyContent="center"
    >
      <Button onClick={logout} widthFitContent>
        <Text>Logout</Text>
      </Button>
      <OpenAIGame />
    </Wrapper>
  );
});
