import {
  FunctionComponent,
  useState,
  createContext,
  useMemo,
  useCallback,
} from "react";
import { Board, Modal, ResultSection } from "src/components";
import styled from "styled-components";
import { devices } from "src/constants/devices";
import {
  getBoardDataWithRandomLayout,
  getInitialResultData,
} from "src/helpers/getBoardData";
import {
  BoardValueType,
  BoardContextType,
  ResultDataType,
} from "src/types/board";
import { shipTypes } from "src/constants/shipsData";

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

// get board data with fixed layout and ship types
// const initialBoardData = getBoardData();

const initialResultData = getInitialResultData(shipTypes);

const randomInitailLayout = getBoardDataWithRandomLayout();

export const BoardContext = createContext<BoardContextType | null>(null);

type Props = {
  onClickCancel: () => void;
};
const Game: FunctionComponent<Props> = ({ onClickCancel }) => {
  const [boardValues, setBoardValues] =
    useState<BoardValueType[][]>(randomInitailLayout);
  const [resultData, setResultData] =
    useState<ResultDataType[]>(initialResultData);
  const [score, setScore] = useState(0);

  const handleGameCompletion = () => {
    setBoardValues(randomInitailLayout);
    setResultData(initialResultData);
    setScore(0);
  };

  const handleResultDataUpdate = useCallback(
    (shipName: string) => {
      const shipData = resultData.find(
        (shipInfo) => shipInfo.ship === shipName
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
    },
    [resultData]
  );

  const handleUpdateScore = useCallback(
    (isHit: boolean) => {
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
    },
    [score]
  );

  const handleBoardClick = useCallback(
    (updatedValue: BoardValueType, position: number[]) => {
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
    },
    [boardValues, handleResultDataUpdate, handleUpdateScore]
  );

  const boardContextValues = useMemo(
    () => ({ boardValues, resultData, handleBoardClick, playerScore: score }),
    [boardValues, resultData, handleBoardClick, score]
  );

  return (
    <BoardContext.Provider value={boardContextValues}>
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
