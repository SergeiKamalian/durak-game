import styled from "styled-components";

export const StyledCard = styled.div`
  background: linear-gradient(
    145deg,
    rgba(88, 120, 168, 1) 0%,
    rgba(63, 91, 134, 1) 100%
  );
  min-width: 90px;
  min-height: 120px;
  max-width: 90px;
  max-height: 120px;
  border-radius: 12px;
  border: 1px solid rgb(116 145 198);
  box-shadow: 5px 8px 8px -2px #263756;
  position: relative;
  z-index: 1;

  cursor: pointer;
  * {
    user-select: none;
  }
`;

export const StyledBackCard = styled(StyledCard)`
  cursor: auto;
  background: linear-gradient(
    145deg,
    rgba(250, 117, 123, 1) 0%,
    rgba(238, 89, 94, 1) 100%
  );
  border-color: rgba(249, 193, 188, 0.51);
  box-shadow: 5px 8px 8px -2px #263756, inset 0px 0px 2px 3px #fe9296;
  position: relative;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: cover;
    opacity: 0.6;
  }
`;

export const StyledSuit = styled.img`
  height: 20px;
  /* position: absolute;
  top: 10px;
  left: 7px; */
  filter: drop-shadow(2px 3px 3px rgba(61, 75, 114, 0.28));
`;
export const StyledRank = styled.span`
  /* position: absolute; */
  /* top: 40px; */
  /* bottom: 7px; */
  /* left: 15px; */
  font-family: "Bai Jamjuree", sans-serif;
  font-weight: 1000;
  font-size: 30px;
  color: rgb(171 189 227);
  filter: drop-shadow(2px 3px 3px rgba(61, 75, 114, 0.28));
`;
export const StyledValues = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  left: 7px;
  top: 0px;
  z-index: 1;
`;
export const StyledRotatedValues = styled(StyledValues)`
  left: auto;
  top: auto;
  right: 5px;
  bottom: 7px;
  z-index: 1;
`;
export const StyledBgImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  transform: scale(1.2);
  opacity: 0.25;
`;
