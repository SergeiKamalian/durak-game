import styled from "styled-components";

export const StyledCardsWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0 30px 10px;
`;

export const StyledCards = styled.div`
  position: relative;
  min-width: 125px;
  min-height: 110px;

  > :first-child {
    position: absolute;
    top: 0;
    left: 0;
  }
  > :last-child {
    position: absolute;
    left: 25px;
    top: 10px;
    rotate: 10deg;
  }
`;
