import { memo } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useAppSelector } from "../../../store";
import { Logo } from "../Logo";

export const Loading = memo(() => {
  const { isInitialized, isAppLoading } = useAppSelector();

  const loading = !isInitialized || isAppLoading;

  return (
    <AnimatePresence initial={false} onExitComplete={() => null}>
      {loading && (
        <StyledLoadingWrapper
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { delay: 0.2 } }}
          data-name="loading-wrapper"
          $isLoading={loading}
        >
          {!isInitialized && <Logo size="large" />}
        </StyledLoadingWrapper>
      )}
    </AnimatePresence>
  );
});

const StyledLoadingWrapper = styled(motion.div)<{ $isLoading: boolean }>`
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(50px);
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  z-index: 999;
  transition: opacity 0.1s;
  opacity: ${(p) => (p.$isLoading ? "1" : "0")};
`;
