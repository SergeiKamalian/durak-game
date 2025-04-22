import styled from "styled-components";

export const StyledPlayerInfo = styled.div`
  position: absolute;
  left: 10%;
  bottom: 60%;
  width: 100px;
  height: 100px;
  min-width: 100px;
  min-height: 100px;
  border-radius: 30%;
  padding: 5px;
  background: #4d67a1;
  border: 1px solid hsl(218.64deg 23.89% 48.43%);
  box-shadow: -1px 5px 13px 1px #263756;
  > :first-child {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 30%;
  }
`;

export const StyledOpponentImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 30%;
  object-fit: cover;
  position: relative;
  z-index: 1;
`;
export const StyledName = styled.span`
  background: #4d67a1;
  border: 1px solid hsl(218.64deg 23.89% 48.43%);
  box-shadow: -1px 5px 13px 1px #263756;
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  color: #b1c3e7;
  font-size: 16px;
  padding: 0px 2px;
  border-radius: 5px;
  z-index: 2;
`;
