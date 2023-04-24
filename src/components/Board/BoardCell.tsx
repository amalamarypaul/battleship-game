import { FunctionComponent } from "react";
import { devices } from "src/constants/devices";
import styled from "styled-components";
import { BoardValueType } from "src/types/board";
import { useBoardContext } from "src/hooks/useBoardContext";

const Tile = styled.div`
  width: calc(95vw / 10);
  height: calc(95vw / 10);
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
      {shipData.isFired ? (shipData.ship ? "Hit" : "Miss") : ""}
    </Tile>
  );
};

export default BoardCell;
