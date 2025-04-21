import styled from "styled-components";

export const StyedRemainingDeck = styled.div`
  position: absolute;
  left: 15px;
  bottom: 10px;
  transform: rotate(-40deg);
`;
export const StyledBackCards = styled.div`
  position: relative;
  z-index: 2;
  > :first-child {
    transform: translateX(5px);
    position: absolute;
  }
`;
export const StyledTrump = styled.div`
  position: absolute;
  top: 0;
  right: -60%;
  transform: rotate(90deg);
  div {
    cursor: auto;
  }
`;
export const StyledCountWrapper = styled.div`
  position: absolute;
  right: -40px;
  top: -40px;
  transform: rotate(40deg);
  z-index: 5;
`;
