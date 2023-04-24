export type BoardValueType = { isFired: boolean; ship?: string };
export type ResultDataType = {
  isSunk: boolean;
  ship: string;
  destroyedCount: number;
  size: number;
};
