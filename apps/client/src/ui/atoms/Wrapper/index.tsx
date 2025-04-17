import { FC, ReactNode, memo } from "react";
import { StyledWrapper } from "./styles";
import { AnimatePresence } from "framer-motion";
import { wrapperAnimation } from "../../../constants";

interface WrapperProps {
  background?: string;
  padding?: string;
  direction?: "row" | "column";
  gap?: number;
  minWidth?: string;
  minHeight?: string;
  maxHeight?: string;
  children: ReactNode;
  borderRadius?: string;
  withBoxShadow?: boolean;
  alignItems?: "center" | "auto";
  justifyContent?: "center" | "auto" | "flex-end" | "space-between";
  position?: "relative" | "absolute" | "unset";
  blur?: string;
  border?: string;
  withAnimation?: boolean;
  overflow?: "hidden";
}

export const Wrapper: FC<WrapperProps> = memo((props) => {
  const {
    background,
    padding = "10px",
    direction = "row",
    gap = 5,
    minHeight,
    minWidth,
    maxHeight,
    children,
    borderRadius,
    withBoxShadow = false,
    alignItems = "auto",
    justifyContent = "auto",
    position = "unset",
    blur = "",
    border = "",
    withAnimation = false,
    overflow,
  } = props;

  if (!withAnimation)
    return (
      <StyledWrapper
        $padding={padding}
        $background={background || "none"}
        $direction={direction}
        $gap={gap}
        $minHeight={minHeight}
        $minWidth={minWidth}
        $maxHeight={maxHeight}
        $borderRadius={borderRadius || "none"}
        $withBoxShadow={withBoxShadow}
        $alignItems={alignItems}
        $justifyContent={justifyContent}
        $position={position}
        $blur={blur}
        $border={border}
        $overflow={overflow}
      >
        {children}
      </StyledWrapper>
    );

  return (
    <AnimatePresence>
      <StyledWrapper
        variants={wrapperAnimation}
        initial="hidden"
        animate="visible"
        exit="exit"
        $padding={padding}
        $background={background || "none"}
        $direction={direction}
        $gap={gap}
        $minHeight={minHeight}
        $minWidth={minWidth}
        $borderRadius={borderRadius || "none"}
        $withBoxShadow={withBoxShadow}
        $alignItems={alignItems}
        $justifyContent={justifyContent}
        $position={position}
        $blur={blur}
        $border={border}
      >
        {children}
      </StyledWrapper>
    </AnimatePresence>
  );
});
