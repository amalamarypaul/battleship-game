import { layout, BOARD_SIZE, shipTypes } from "src/constants/shipsData";
import {
  BoardValueType,
  ResultDataType,
  ShipType,
  Ships,
} from "src/types/board";

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

export const getInitialResultData = (shipTypes: Ships) => {
  const resultData: ResultDataType[] = [];
  for (const [key, value] of Object.entries(shipTypes)) {
    if (value.count > 1) {
      resultData.push(
        ...Array(value.count)
          .fill({})
          .map((item, index) => ({
            ship: key + (index + 1),
            isSunk: false,
            destroyedCount: 0,
            size: value.size,
          }))
      );
    } else {
      resultData.push({
        ship: key,
        isSunk: false,
        destroyedCount: 0,
        size: value.size,
      });
    }
  }

  return resultData;
};

export const generateBoardData = (size: number) =>
  Array(size)
    .fill("0")
    .map((item) => Array(size).fill({ isFired: false }));

export const getAllShips = (shipTypes: Ships) => {
  const ships: ShipType[] = [];
  for (const [key, value] of Object.entries(shipTypes)) {
    if (value.count > 1) {
      ships.push(
        ...Array(value.count)
          .fill({})
          .map((item, index) => ({ name: key + (index + 1), size: value.size }))
      );
    } else {
      ships.push({ name: key, size: value.size });
    }
  }
  return ships;
};

export const getRandomIndex = (size: number) =>
  Math.floor(Math.random() * Math.floor(size));

export const getPossibleDirection = (
  rowindex: number,
  colindex: number,
  ship: ShipType,
  board: BoardValueType[][]
) => {
  let isValid = false;
  let direction = "";
  let impossibleDirectionValue = 0;
  //Let keep direction values mapping to  1-->up, 2-->right, 3-->down, 4-->left
  for (let directionValue = 1; directionValue <= 4; directionValue++) {
    for (let i = 0; i < ship.size; i++) {
      if (directionValue === 1) {
        //up
        if (rowindex - i < 0 || board[rowindex - i][colindex].ship) {
          impossibleDirectionValue = directionValue;
          break;
        }
      } else if (directionValue === 2) {
        //right
        if (
          colindex + i >= board.length ||
          board[rowindex][colindex + i].ship
        ) {
          impossibleDirectionValue = directionValue;
          break;
        }
      } else if (directionValue === 3) {
        //down

        if (
          rowindex + i >= board.length ||
          board[rowindex + i][colindex].ship
        ) {
          impossibleDirectionValue = directionValue;
          break;
        }
      } else {
        //left
        if (colindex - i < 0 || board[rowindex][colindex - i].ship) {
          impossibleDirectionValue = directionValue;
        }
      }
    }
    if (
      impossibleDirectionValue !== 0 &&
      impossibleDirectionValue !== directionValue
    ) {
      direction =
        directionValue === 1
          ? "up"
          : directionValue === 2
          ? "right"
          : directionValue === 3
          ? "down"
          : "left";
      isValid = true;
      break;
    }
  }
  return { isValid, direction };
};
export const placeShipInPosition = (
  rowindex: number,
  colindex: number,
  ship: ShipType,
  board: BoardValueType[][],
  direction: string
) => {
  for (let i = 0; i < ship.size; i++) {
    if (direction === "up") {
      //up
      board[rowindex - i][colindex] = {
        ...board[rowindex - i][colindex],
        ship: ship.name,
      };
    } else if (direction === "right") {
      //right
      board[rowindex][colindex + i] = {
        ...board[rowindex][colindex + i],
        ship: ship.name,
      };
    } else if (direction === "down") {
      //down
      board[rowindex + i][colindex] = {
        ...board[rowindex + i][colindex],
        ship: ship.name,
      };
    } else {
      //left
      board[rowindex][colindex - i] = {
        ...board[rowindex][colindex - i],
        ship: ship.name,
      };
    }
  }

  return board;
};

const generateRandomPosition = (
  board: BoardValueType[][],
  boardSize: number,
  ship: ShipType
) => {
  let gotPosition = false;
  let updatedBoard: BoardValueType[][] = [];
  while (!gotPosition) {
    let rowIndex = getRandomIndex(boardSize);
    let colIndex = getRandomIndex(boardSize);
    const { isValid, direction } = getPossibleDirection(
      rowIndex,
      colIndex,
      ship,
      board
    );
    if (isValid) {
      updatedBoard = placeShipInPosition(
        rowIndex,
        colIndex,
        ship,
        board,
        direction
      );
      gotPosition = true;
    }
  }
  return updatedBoard;
};

export const getBoardDataWithRandomLayout = () => {
  let boardData: BoardValueType[][] = generateBoardData(BOARD_SIZE);

  const shipList = getAllShips(shipTypes);

  shipList.forEach((ship) => {
    const tempboardData = boardData.map((rowData) => rowData.slice());
    boardData = generateRandomPosition(tempboardData, BOARD_SIZE, ship);
  });
  return boardData;
};
