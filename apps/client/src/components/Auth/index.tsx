import { memo } from "react";
import { StyledAuth } from "./styles";
import { Button, FormField, Text, Wrapper } from "../../ui";
import { HiOutlineKey, HiOutlineUserCircle } from "react-icons/hi";
import { Formik } from "formik";
import {
  REGISTRATION_INITIAL_VALUES,
  REGISTRATION_SCHEMA,
} from "../../constants";
import { useAuth } from "./useAuth";
import { OpenAIGame } from "../OpenAIGame";

export const Auth = memo(() => {
  const { handleSubmit, isAuthorization, switchAuthView, theme } = useAuth();

  return (
    <StyledAuth>
      <Wrapper
        withAnimation
        background={"#12141ec2"}
        border={"1px solid #7a788130"}
        blur="10px"
        padding="20px"
        direction="column"
        minWidth="450px"
        gap={10}
        borderRadius="30px"
        withBoxShadow
      >
        <Wrapper alignItems="center" gap={10}>
          {isAuthorization ? (
            <HiOutlineKey color={theme.colors.white} size={30} />
          ) : (
            <HiOutlineUserCircle color={theme.colors.white} size={30} />
          )}

          <Text color={theme.colors.white} fz={35} fw={600}>
            {isAuthorization ? "Authorization" : "Registration"}
          </Text>
        </Wrapper>
        <Formik
          initialValues={REGISTRATION_INITIAL_VALUES}
          validationSchema={REGISTRATION_SCHEMA}
          onSubmit={handleSubmit}
          validateOnChange={false}
          validateOnBlur={false}
          enableReinitialize
        >
          {({ handleSubmit }) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <Wrapper direction="column" gap={10} minWidth="100%">
                <FormField name="name" placeholder="Name" label="Name" />
                <FormField
                  name="password"
                  placeholder="Password"
                  type="password"
                  label="Password"
                />
                <Button type="submit" size="big">
                  <Text fz={20}>
                    {isAuthorization ? "Sign In" : "Register"}
                  </Text>
                </Button>
              </Wrapper>
            </form>
          )}
        </Formik>
        <Wrapper padding="0">
          <Text fz={14}>
            {isAuthorization
              ? `I don't have an account,`
              : "I have an account,"}
          </Text>
          <Text
            fz={14}
            fw={600}
            color={theme.colors.link}
            cursor="pointer"
            decoration="underline"
            onClick={switchAuthView}
          >
            {isAuthorization ? "Registration" : "Authorization"}
          </Text>
        </Wrapper>
      </Wrapper>
      <OpenAIGame />
    </StyledAuth>
  );
});
