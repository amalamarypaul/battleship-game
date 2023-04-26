import { cleanup } from "@testing-library/react";
import {
  getAllShips,
  getRandomIndex,
  generateBoardData,
  getPossibleDirection,
  placeShipInPosition,
  getResultData,
  generateRandomPosition,
  getBoardDataWithRandomLayout,
} from "./getBoardData";
import { BoardValueType, Ships } from "src/types/board";

describe("helper functions for board", () => {
  const shipsList = {
    carrier: { size: 5, count: 1 },
    battleship: { size: 4, count: 2 },
  };
  describe("getResultData", () => {
    const results = getResultData(shipsList);
    it("should return array of all ships", () => {
      expect(results.length).toBe(3);
    });
    it("should return with unique ship names", () => {
      expect(!!results.find((item) => item.ship === "carrier")).toBe(true);
      expect(!!results.find((item) => item.ship === "battleship2")).toBe(true);
      expect(results[2]).toStrictEqual({
        destroyedCount: 0,
        isSunk: false,
        ship: "battleship2",
        size: 4,
      });
    });
    it("should return initial state of isSunk and destroyed count", () => {
      expect(results[2]).toStrictEqual({
        destroyedCount: 0,
        isSunk: false,
        ship: "battleship2",
        size: 4,
      });
    });
  });
  describe("getAllShips", () => {
    it("should return list all ships", () => {
      const results = getAllShips(shipsList);
      expect(results.length).toBe(3);
      expect(results[2]).toStrictEqual({
        name: "battleship2",
        size: 4,
      });
    });
  });
  describe("getRandomIndex", () => {
    it("should return a number within the size limit", () => {
      const result = getRandomIndex(4);
      expect(result).toBeLessThanOrEqual(3);
      expect(result).toBeGreaterThanOrEqual(0);
    });
  });
  describe("generateBoardData", () => {
    it("should return a matrix with given size", () => {
      const result = generateBoardData(4);
      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toBe(4);
      expect(result[0].length).toBe(4);
    });
  });
  describe("getPossibleDirection", () => {
    it("should return isValid false of the ship size higher than board size", () => {
      const board = generateBoardData(4);
      const result = getPossibleDirection(
        0,
        0,
        { name: "carrier", size: 6 },
        board
      );
      expect(result).toStrictEqual({ isValid: false, direction: "" });
    });

    it("should return isValid true and a direction", () => {
      const result = getPossibleDirection(
        0,
        0,
        { name: "carrier", size: 2 },
        generateBoardData(4)
      );
      expect(result.isValid).toBeTruthy();

      expect(
        result.direction === "right" || result.direction === "down"
      ).toBeTruthy();
    });
    it("should not allow overlapping of positions", () => {
      cleanup();
      const board = [
        [{ ship: "carrier", isFired: false }, { isFired: false }],
        [{ ship: "carrier", isFired: false }, { isFired: false }],
      ];
      const result1 = getPossibleDirection(
        0,
        0,
        { name: "carrier1", size: 2 },
        board
      );

      expect(result1.isValid).toBeFalsy();

      const result2 = getPossibleDirection(
        0,
        1,
        { name: "carrier1", size: 2 },
        board
      );
      expect(result2.isValid).toBeTruthy();
      expect(result2.direction).toBe("down");
    });
  });
  describe("placeShipInPosition", () => {
    it("should return a board with given ship in correct position", () => {
      const board = [
        [{ ship: "carrier", isFired: false }, { isFired: false }],
        [{ ship: "carrier", isFired: false }, { isFired: false }],
      ];
      const result = placeShipInPosition(
        0,
        1,
        { name: "carrier1", size: 2 },
        board,
        "down"
      );

      expect(Array.isArray(result)).toBeTruthy();
      expect(result[0][1]).toStrictEqual({ isFired: false, ship: "carrier1" });
      expect(result[1][1]).toStrictEqual({ isFired: false, ship: "carrier1" });
    });
  });
  describe("generateRandomPosition", () => {
    it("should return a board with given ship", () => {
      const board = [
        [{ isFired: false }, { isFired: false }],
        [{ isFired: false }, { isFired: false }],
      ];
      const result = generateRandomPosition(board, 2, {
        name: "carrier1",
        size: 2,
      });

      expect(Array.isArray(result)).toBeTruthy();
      const shipData: BoardValueType[] = [];
      result.forEach((row) => {
        row.forEach((col) => {
          if (col.ship) {
            shipData.push(col);
          }
        });
      });
      expect(shipData.length).toBe(2);
      expect(shipData[0]).toStrictEqual({ isFired: false, ship: "carrier1" });
    });
  });
  describe("getBoardDataWithRandomLayout", () => {
    it("should return a board with given ships", () => {
      const shipTypes: Ships = {
        carrier: { size: 2, count: 1 },
        cruiser: { size: 3, count: 1 },
      };
      const result = getBoardDataWithRandomLayout(4, shipTypes);

      expect(Array.isArray(result)).toBeTruthy();

      const shipData: BoardValueType[] = [];
      result.forEach((row) => {
        row.forEach((col) => {
          if (col.ship) {
            shipData.push(col);
          }
        });
      });
      expect(shipData.length).toBe(5);
      expect(shipData.filter((data) => data.ship === "carrier").length).toBe(2);
      expect(shipData.filter((data) => data.ship === "cruiser").length).toBe(3);
    });
  });
});
