import { FunctionComponent } from "react";
import { devices } from "src/constants/devices";
import styled, { keyframes } from "styled-components";
import { BoardValueType } from "src/types/board";
import { useBoardContext } from "src/hooks/useBoardContext";
import { Hit, Miss } from "src/assets";

const Tile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100vw / 10);
  height: calc(100vw / 10);
  cursor: pointer;
  border-left: 1px solid black;
  border-top: 1px solid black;
  &:last-child {
    border-right: 1px solid black;
  }
  @media (${devices.laptop}) {
    width: 60px;
    height: 60px;
  }
`;
const animation = keyframes`

  from {
    scale:0;
    opacity:0;
  }
  to {
    scale:1;
    opacity:1;
  }
`;
const HitMark = styled.img`
  width: 20px;
  height: 20px;
  animation: ${animation} 100ms ease-in-out;
  @media (${devices.tablet}) {
    width: 40px;
    height: 40px;
  }
`;
const MissMark = styled.img`
  width: 20px;
  height: 20px;
  animation: ${animation} 100ms ease-in-out;
  @media (${devices.tablet}) {
    width: 40px;
    height: 40px;
  }
`;
type Props = {
  position: number[];
  shipData: BoardValueType;
};
const BoardCell: FunctionComponent<Props> = ({ position, shipData }) => {
  const { handleBoardClick } = useBoardContext();
  const handleClick = () => {
    if (shipData.isFired) {
      return;
    }
    handleBoardClick({ ...shipData, isFired: true }, position);
  };
  return (
    <Tile onClick={handleClick}>
      {" "}
      {shipData.isFired ? (
        shipData.ship ? (
          <HitMark src={Hit} alt="Hit" />
        ) : (
          <MissMark src={Miss} alt="Miss" />
        )
      ) : (
        ""
      )}
    </Tile>
  );
};

export default BoardCell;
