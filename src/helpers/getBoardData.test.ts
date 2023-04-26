import { cleanup } from "@testing-library/react";
import {
  getInitialResultData,
  getAllShips,
  getRandomIndex,
  generateBoardData,
  getPossibleDirection,
} from "./getBoardData";

describe("helper functions for board", () => {
  const shipsList = {
    carrier: { size: 5, count: 1 },
    battleship: { size: 4, count: 2 },
  };
  describe("getInitialResultData", () => {
    const results = getInitialResultData(shipsList);
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
});
