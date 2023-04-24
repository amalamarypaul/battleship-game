import { FunctionComponent, useState } from "react";
import { Board, ResultSection } from "src/components";
import styled from "styled-components";
import { devices } from "src/constants/devices";
import { getBoardData } from "src/helpers/getBoardData";
import { BoardValueType } from "src/types/board";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  width: 100%;
  @media (${devices.laptop}) {
    flex-direction: row-reverse;
    gap: 20px;
    margin: 20px auto;
  }
`;
const boardData = getBoardData();

const Game: FunctionComponent = () => {
  const [boardValues, setBoardValues] = useState<BoardValueType[][]>(boardData);
  const handleBoardClick = (
    updatedValue: BoardValueType,
    position: number[]
  ) => {
    const newBoardValues = boardValues.slice();
    newBoardValues[position[0]][position[1]] = updatedValue;
    setBoardValues(newBoardValues);
  };
  return (
    <Container data-testid="battleship">
      <Board boardData={boardValues} handleBoardClick={handleBoardClick} />
      <ResultSection />
    </Container>
  );
};

export default Game;
