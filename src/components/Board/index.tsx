import styled from "styled-components";

import { BoardValues } from "src/types/board";
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

const boardValues: BoardValues = [
  [0, 1, 0, 0, 0, 1, 1, 0, 0, 0],
  [0, 1, 0, 0, 0, 1, 1, 0, 0, 0],
  [0, 1, 0, 0, 0, 1, 1, 0, 0, 0],
  [0, 1, 0, 0, 0, 1, 1, 0, 0, 0],
  [0, 1, 0, 0, 0, 1, 1, 0, 0, 0],
  [0, 1, 0, 0, 0, 1, 1, 0, 0, 0],
  [0, 1, 0, 0, 0, 1, 1, 0, 0, 0],
  [0, 1, 0, 0, 0, 1, 1, 0, 0, 0],
  [0, 1, 0, 0, 0, 1, 1, 0, 0, 0],
  [0, 1, 0, 0, 0, 1, 1, 0, 0, 0],
];

const Board = () => {
  return (
    <Container>
      {boardValues.map((rowValue, rowIndex) => {
        return (
          <BoardRow key={`row-${rowIndex}`}>
            {rowValue.map((colValue, colIndex) => {
              return <BoardCell key={`col-${rowIndex}${colIndex}`}></BoardCell>;
            })}
          </BoardRow>
        );
      })}
    </Container>
  );
};

export default Board;
