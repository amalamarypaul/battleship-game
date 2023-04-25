import { layout, BOARD_SIZE, shipTypes } from "src/constants/shipsData";
import { BoardValueType, ResultDataType, ShipType } from "src/types/board";

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

const generateBoardData = (size: number) =>
  Array(size)
    .fill("0")
    .map((item) => Array(size).fill({ isFired: false }));

const getAllShips = () => {
  const ships: ShipType[] = [];
  for (const [key, value] of Object.entries(shipTypes)) {
    ships.push(...Array(value.count).fill({ name: key, size: value.size }));
  }
  return ships;
};

const getRandomIndex = (size: number) =>
  Math.floor(Math.random() * Math.floor(size));

const getPossibleDirection = (
  rowindex: number,
  colindex: number,
  ship: ShipType,
  board: BoardValueType[][]
) => {
  let isValid = false;
  let directionValue = Math.floor(Math.random() * 4) + 1;
  let direction = "";
  //Let keep direction values mapping to  1-->up, 2-->right, 3-->down, 4-->left

  for (let i = 0; i < ship.size; i++) {
    if (directionValue === 1) {
      //up
      if (rowindex - i < 0 || board[rowindex - i][colindex].ship) {
        return { isValid, direction };
      }
    } else if (directionValue === 2) {
      //right
      if (colindex + i >= board.length || board[rowindex][colindex + i].ship) {
        return { isValid, direction };
      }
    } else if (directionValue === 3) {
      //down
      if (rowindex + i >= board.length || board[rowindex + i][colindex].ship) {
        return { isValid, direction };
      }
    } else {
      //left
      if (colindex - i < 0 || board[rowindex][colindex - i].ship) {
        return { isValid, direction };
      }
    }
  }
  isValid = true;
  direction =
    directionValue === 1
      ? "up"
      : directionValue === 2
      ? "right"
      : directionValue === 3
      ? "down"
      : "left";
  return { isValid, direction };
};
const placeShipInPosition = (
  rowindex: number,
  colindex: number,
  ship: ShipType,
  board: BoardValueType[][],
  direction: string
) => {
  // const board = tempboardData.map((rowData) => rowData.slice());
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

  const shipList = getAllShips();

  shipList.forEach((ship) => {
    const tempboardData = boardData.map((rowData) => rowData.slice());
    boardData = generateRandomPosition(tempboardData, BOARD_SIZE, ship);
  });
  return boardData;
};
