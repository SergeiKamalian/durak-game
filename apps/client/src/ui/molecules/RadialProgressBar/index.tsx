import { useEffect, useState } from "react";
import styled from "styled-components";

type RadialProgressBarProps = {
  value: number;
  className?: string;
  children?: React.ReactNode;
  trackColor?: string;
  progressColor?: string;
};

const Wrapper = styled.div<{
  $value: number;
  $color: string;
}>`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $value, $color }) =>
    `conic-gradient(#4d67a1 ${$value * 3.6}deg, ${$color} 0deg)`};
  overflow: hidden;
`;

const Content = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RadialProgressBar = ({
  value,
  className,
  children,
}: RadialProgressBarProps) => {
  const newValue = 100 - value;
  const [color, setColor] = useState("#91ca5a");

  useEffect(() => {
    if (newValue > 20) setColor("#91ca5a");
    else setColor("#ed525c");
  }, [newValue]);

  return (
    <Wrapper $color={color} className={className} $value={newValue}>
      <Content>{children}</Content>
    </Wrapper>
  );
};
