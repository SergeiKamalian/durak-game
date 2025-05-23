import styled from "styled-components";

export const StyledOpponent = styled.div`
  width: 80px;
  height: 80px;
  min-width: 80px;
  min-height: 80px;
  border-radius: 30%;
  padding: 5px;
  background: #4d67a1;
  border: 1px solid hsl(218.64deg 32.02% 39.74%);
  box-shadow: inset -1px 5px 13px 1px #263756;
  position: relative;
`;
export const StyledOpponentImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 30%;
  object-fit: cover;
  box-shadow: -1px 5px 13px 1px #263756;
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
`;
export const StyledOpponentCards = styled.div<{ $cardsCount: number }>`
  width: 10px;
  height: 10px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(p) => `calc(45px + ${(p.$cardsCount - 1) * 7}px)`};

  > p {
    user-select: none;
    text-shadow: 4px 4px 7px rgba(38, 55, 86, 0.78);
  }
`;

export const StyledBackCardItem = styled.div<{ $index: number }>`
  position: absolute;
  left: ${(p) => `${p.$index * 7}px`};

  > div {
    zoom: 0.5;
  }
`;

export const StyledOpponentMessage = styled.div`
  background: #243a59;
  color: rgb(209, 221, 246);
  position: absolute;
  right: calc(100% + 20px);
  padding: 10px 20px;
  border-radius: 10px;
  white-space: nowrap;
  box-shadow: -1px 5px 13px 1px #263756;
  bottom: 0;
  border: 1px solid #40557c;
  font-weight: 500;
  zoom: 1.2;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 100%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-left: 12px solid #40557c;
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 100%;
    transform: translateY(-50%) translateX(-3px);
    width: 0;
    height: 0;
    border-top: 9px solid transparent;
    border-bottom: 9px solid transparent;
    border-left: 13px solid #243a59;
  }
`;
