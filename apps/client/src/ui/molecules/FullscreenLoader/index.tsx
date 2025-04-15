import { memo } from "react";
import styled from "styled-components";
import { Text } from "../../atoms";
import { AnimatePresence, motion } from "framer-motion";
import { fullscreenAnimation } from "../../../constants";

interface FullscreenLoaderProps {
  isVisible: boolean;
}

export const FullscreenLoader = memo((props: FullscreenLoaderProps) => {
  const { isVisible } = props;
  return (
    <AnimatePresence>
      {isVisible && (
        <StyledFullscreenLoader
          variants={fullscreenAnimation}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Text color="white" fz={30}>
            Recourses loading...
          </Text>
        </StyledFullscreenLoader>
      )}
    </AnimatePresence>
  );
});

const StyledFullscreenLoader = styled(motion.div)`
  width: 100svw;
  height: 100svh;
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  background: black;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;
