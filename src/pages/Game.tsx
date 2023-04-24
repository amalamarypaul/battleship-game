import { FunctionComponent, useState } from "react";
import { Board, ResultSection } from "src/components";
import styled from "styled-components";
import { devices } from "src/constants/devices";
import { getBoardData, getInitialResultData } from "src/helpers/getBoardData";
import { BoardValueType, ResultDataType } from "src/types/board";

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
const initialResultData = getInitialResultData();

const Game: FunctionComponent = () => {
  const [boardValues, setBoardValues] = useState<BoardValueType[][]>(boardData);
  const [resultData, setResultData] =
    useState<ResultDataType[]>(initialResultData);

  const handleBoardClick = (
    updatedValue: BoardValueType,
    position: number[]
  ) => {
    const newBoardValues = boardValues.slice();
    newBoardValues[position[0]][position[1]] = updatedValue;
    setBoardValues(newBoardValues);

    if (updatedValue.ship) {
      // Update destroyed status in the result of the hit position occupied by ship
      const shipData = resultData.find(
        (shipInfo) => shipInfo.ship === updatedValue.ship
      );
      if (shipData) {
        const newDestroyedCount = shipData.destroyedCount + 1;
        //isSunk is a variable value set to true if the a ship completely destroyed
        const isSunk = newDestroyedCount === shipData.size;
        const newResult = resultData.map((item) => {
          if (item.ship === shipData.ship) {
            return { ...item, destroyedCount: newDestroyedCount, isSunk };
          }
          return item;
        });

        setResultData(newResult);
      }
    }
  };
  return (
    <Container data-testid="battleship">
      <Board boardData={boardValues} handleBoardClick={handleBoardClick} />
      <ResultSection />
    </Container>
  );
};

export default Game;
