import styled from "styled-components";

export const StyledAuth = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  position: relative;
`;
export const StyledAIBtn = styled.button`
  background: none;
  cursor: pointer;
  > div {
    max-height: 50px;
    box-shadow: 0 0 0px;
    box-shadow: inset 0 0 0 transparent;
    transition: box-shadow 0.4s;
  }

  * {
    cursor: pointer;
  }

  &:hover {
    > div {
      box-shadow: inset 0px 8px 22px 0px rgb(12 163 127 / 26%);
    }
    img {
      transform: scale(1.2);
    }
  }
`;
export const StyledImage = styled.div`
  position: absolute;
  right: 40px;
  rotate: 20deg;

  img {
    transition: all 0.4s;
    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.4));
  }
`;
