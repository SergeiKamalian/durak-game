import styled from "styled-components";

export const StyledNotificationWrapper = styled.div`
  background: ${(p) => p.theme.colors.secondary};
  backdrop-filter: blur(5px);
  display: flex;
  flex-direction: column;
  padding: 20px 50px;
  align-items: center;
  position: relative;
  max-width: 400px;
  min-width: 250px;
  margin-top: 20px;

  &:before {
    content: "";
    width: 50px;
    height: 100%;
    position: absolute;
    left: -35px;
    top: 0;
    background: linear-gradient(90deg, transparent 0%, #12141e 50%);
  }
  &:after {
    content: "";
    width: 50px;
    height: 100%;
    position: absolute;
    right: -35px;
    top: 0;
    background: linear-gradient(90deg, transparent 0%, #12141e 50%);
    transform: rotate(180deg);
  }
`;
export const StyledImage = styled.img`
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 35px;
  height: 35px;
  z-index: 2;
`;

export const StyledLines = styled.div`
  height: 100%;
  width: 100%;
  z-index: 1;
  position: absolute;
  top: 0;

  &:before {
    content: "";
    width: 70%;
    height: 2px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 0px;
    background: linear-gradient(to left, transparent, #b3a582, transparent);
  }
  &:after {
    content: "";
    width: 110%;
    height: 2px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0px;
    background: linear-gradient(to left, transparent, #b3a582, transparent);
  }
`;
