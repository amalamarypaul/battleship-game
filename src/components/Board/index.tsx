import { FunctionComponent } from "react";
import styled from "styled-components";

import { BoardValueType } from "src/types/board";
import { colors } from "src/constants/colors";

import BoardCell from "./BoardCell";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 4px solid ${colors.primaryColor};
  max-width: 610px;
`;
const BoardRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  &:last-child {
    border-bottom: 1px solid black;
  }
`;

type Props = {
  boardData: BoardValueType[][];
};

const Board: FunctionComponent<Props> = ({ boardData }) => {
  return (
    <Container>
      {boardData.map((rowValue, rowIndex) => {
        return (
          <BoardRow key={`row-${rowIndex}`}>
            {rowValue.map((colValue, colIndex) => {
              return (
                <BoardCell
                  key={`col-${rowIndex}${colIndex}`}
                  shipData={colValue}
                  position={[rowIndex, colIndex]}
                ></BoardCell>
              );
            })}
          </BoardRow>
        );
      })}
    </Container>
  );
};

export default Board;
