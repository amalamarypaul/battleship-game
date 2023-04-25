export type BoardValueType = { isFired: boolean; ship?: string };
export type ResultDataType = {
  isSunk: boolean;
  ship: string;
  destroyedCount: number;
  size: number;
};
export type BoardContextType = {
  boardValues: BoardValueType[][];
  resultData: ResultDataType[];
  playerScore: number;
  handleBoardClick: (value: BoardValueType, position: number[]) => void;
};
export type ShipType = { name: string; size: number };
