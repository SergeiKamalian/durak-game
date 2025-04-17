import styled from "styled-components";

export const StyledCardsWrapper = styled.div`
  width: 300px;
  position: absolute;
  bottom: -30px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
`;

export const StyledPlayerCards = styled.div`
  height: 100%;
  position: absolute;
  left: 35%;
`;

export const StyledDiv = styled.div<{ index: number }>`
  position: absolute;
  transform-origin: 50% 100%;
  transform: rotate(${(p) => p.index * 5}deg)
    translate(calc(20px * ${(p) => p.index}), 0px) scale(1.2);
`;
