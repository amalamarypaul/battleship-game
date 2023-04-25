import { FunctionComponent, useState, createContext } from "react";
import { Board, Modal, ResultSection } from "src/components";
import styled from "styled-components";
import { devices } from "src/constants/devices";
import {
  getBoardData,
  getBoardDataWithRandomLayout,
  getInitialResultData,
} from "src/helpers/getBoardData";
import {
  BoardValueType,
  BoardContextType,
  ResultDataType,
} from "src/types/board";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0;
  width: 100%;
  @media (${devices.laptop}) {
    flex-direction: row-reverse;
    align-items: flex-start;
    gap: 20px;
    margin: 20px auto;
  }
`;
const initialBoardData = getBoardData();
const initialResultData = getInitialResultData();
//TODO: use random board data to final stage
const randomInitailLayout = getBoardDataWithRandomLayout();

export const BoardContext = createContext<BoardContextType | null>(null);

type Props = {
  onClickCancel: () => void;
};
const Game: FunctionComponent<Props> = ({ onClickCancel }) => {
  const [boardValues, setBoardValues] =
    useState<BoardValueType[][]>(initialBoardData);
  const [resultData, setResultData] =
    useState<ResultDataType[]>(initialResultData);
  const [score, setScore] = useState(0);

  const handleGameCompletion = () => {
    setBoardValues(initialBoardData);
    setResultData(initialResultData);
    setScore(0);
  };

  const handleResultDataUpdate = (shipName: string) => {
    const shipData = resultData.find((shipInfo) => shipInfo.ship === shipName);
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
  };

  const handleUpdateScore = (isHit: boolean) => {
    let updatedScore = score;
    /*
    Score system
     - Add 30 points to on every hit
     - Substract 5 points on every miss
     - Score can be negative value
    */

    if (isHit) {
      updatedScore = updatedScore + 30;
    } else {
      updatedScore = updatedScore - 5;
    }
    setScore(updatedScore);
  };

  const handleBoardClick = (
    updatedValue: BoardValueType,
    position: number[]
  ) => {
    // to get deep copy of board values -two level, map create a new array of first level
    // slice will make new array of each next level array.
    const newBoardValues = boardValues.map((row) => row.slice());
    newBoardValues[position[0]][position[1]] = updatedValue;
    setBoardValues(newBoardValues);
    handleUpdateScore(updatedValue.ship ? true : false);
    if (updatedValue.ship) {
      // Update destroyed status in the result of the hit position occupied by ship
      handleResultDataUpdate(updatedValue.ship);
    }
  };

  return (
    <BoardContext.Provider
      value={{ boardValues, resultData, handleBoardClick, playerScore: score }}
    >
      <Container data-testid="battleship">
        <Board boardData={boardValues} />
        <ResultSection />
        {resultData.every((resultItem) => resultItem.isSunk) ? (
          <Modal
            okClick={handleGameCompletion}
            description={`Score: ${score}`}
            cancelClick={onClickCancel}
          />
        ) : null}
      </Container>
    </BoardContext.Provider>
  );
};

export default Game;
