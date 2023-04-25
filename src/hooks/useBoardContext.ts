import { useContext } from "react";
import { BoardContext } from "src/pages/Game";
import { BoardContextType } from "src/types/board";

//hook to exposrt the context values of board context
export const useBoardContext = () => {
  const { boardValues, handleBoardClick, resultData, playerScore } = useContext(
    BoardContext
  ) as BoardContextType;

  return {
    boardValues,
    handleBoardClick,
    playerScore,
    resultData,
  };
};
