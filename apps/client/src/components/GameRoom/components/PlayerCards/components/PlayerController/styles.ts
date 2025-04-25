import styled from "styled-components";

export const StyledPlayerController = styled.div<{ $isStart: boolean }>`
  position: absolute;
  right: ${(p) => !p.$isStart && "10%"};
  bottom: 60%;
  p {
    font-family: "Bai Jamjuree", sans-serif;
  }
`;

export const StyledStartGame = styled.button`
  opacity: 0.9;
  font-family: "Bai Jamjuree", sans-serif;
  cursor: pointer;
  width: 140px;
  height: 70px;
  border-radius: 100px;
  font-size: 20px;
  font-weight: 800;
  transition: all 0.3s;
  &:hover {
    opacity: 1;
  }
`;

export const StyledPlayerControllerItem = styled.button<{
  $type: "defender" | "attacker";
}>`
  opacity: 0.9;
  font-family: "Bai Jamjuree", sans-serif;
  cursor: pointer;
  background: ${(p) => (p.$type === "attacker" ? " #243a59" : "#ed555c")};
  width: 140px;
  height: 70px;
  border-radius: 100px;
  font-size: 20px;
  font-weight: 800;
  letter-spacing: 1px;
  color: white;
  box-shadow: ${(p) =>
    p.$type === "attacker"
      ? "5px 8px 8px -2px #263756, inset 1px 1px 1px 2px #374f74"
      : "5px 8px 8px -2px #263756, inset 1px 1px 1px 2px rgb(247, 141, 152)"};
  border: 1px solid #374f74;
  text-shadow: 1px 2px 8px #263756ba;
  text-transform: uppercase;
  transition: all 0.3s;
  &:hover {
    opacity: 1;
  }
`;
