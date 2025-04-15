import styled from "styled-components";

type Size = "large" | "small" | "medium";

const zoomValues = {
  large: 2.5,
  medium: 1.5,
  small: 1,
};

export const StyledLogo = styled.div<{ $size: Size }>`
  zoom: ${(p) => zoomValues[p.$size]};
  user-select: none;
`;
