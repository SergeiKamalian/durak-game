import styled from "styled-components";

export const StyledCardsWrapper = styled.div`
  width: 80%;
  position: absolute;
  bottom: -40px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  z-index: 10;
`;

export const StyledPlayerCards = styled.div`
  height: 100%;
  position: absolute;
  left: 47%;
`;

export const StyledCardWrapper = styled.div<{
  $index: number;
  $isSelected: boolean;
}>`
  position: absolute;
  transform-origin: 50% 100%;
  transform: rotate(${(p) => p.$index * 2}deg)
    translate(calc(60px * ${(p) => p.$index}), 0px) scale(2);

  > :first-child {
    transition: all 0.2s;
    box-shadow: ${(p) =>
      p.$isSelected &&
      "5px 8px 8px -2px #263756, inset 1px 1px 20px rgba(247, 102, 114, 0.36)"};
    transform: ${(p) => p.$isSelected && "translateY(-15px)"};
  }
`;
