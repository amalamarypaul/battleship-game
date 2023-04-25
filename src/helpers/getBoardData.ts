import { layout, BOARD_SIZE, shipTypes } from "src/constants/shipsData";
import { BoardValueType, ResultDataType } from "src/types/board";

//function to get matrix representation of the grid
export const getBoardData = () => {
  const boardData: BoardValueType[][] = [];
  for (let row = 0; row < BOARD_SIZE; row++) {
    const boardRowData: BoardValueType[] = [];
    for (let col = 0; col < BOARD_SIZE; col++) {
      //To check if the current cell contains a ship
      const shipWithinCell = layout.find((ship) => {
        const isPositionInCell = ship.positions.find(
          (pos) => pos[0] === row && pos[1] === col
        );
        if (isPositionInCell) {
          return ship;
        }
        return null;
      });
      // isFired is used to know if the user has fired to the current cell
      if (shipWithinCell) {
        boardRowData.push({
          ship: shipWithinCell.ship,
          isFired: false,
        });
      } else {
        boardRowData.push({ isFired: false });
      }
    }
    boardData.push(boardRowData);
  }
  return boardData;
};

//function to get result data initial state
export const getInitialResultData = () => {
  const resultData: ResultDataType[] = [];
  for (const [key, value] of Object.entries(shipTypes)) {
    resultData.push({
      ship: key,
      isSunk: false,
      destroyedCount: 0,
      size: value.size,
    });
  }

  return resultData;
};
