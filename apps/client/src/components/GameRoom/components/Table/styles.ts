import styled from "styled-components";

export const StyledTable = styled.div`
  width: 65svw;
  height: 65svh;
  border-radius: 60svw;
  border: 1px solid hsl(218.64deg 23.89% 48.43%);
  box-shadow: 7px 11px 20px 1px #263756;
  background: #364f74;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const StyledTableInner = styled.div`
  position: relative;
  overflow: hidden;
  width: calc(100% - 60px);
  height: calc(100% - 60px);
  background: radial-gradient(
    circle,
    rgba(48, 69, 103, 1) 0%,
    rgba(40, 60, 89, 1) 100%
  );
  border-radius: 60svw;
  box-shadow: inset 0 0 20px #1f3658;
  border: 1px solid hsl(218.64deg 31.43% 30.59%);
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const StyledDeck = styled.div`
  width: 70%;
  height: 40%;
  background: red;
`;
export const StyledCards = styled.div`
  position: relative;
  min-width: 125px;
  min-height: 110px;
  margin-right: 20px;
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
