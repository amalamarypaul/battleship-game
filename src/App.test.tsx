import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders battleship app", () => {
  render(<App />);
  const linkElement = screen.getByTestId("battleship-game");

  expect(linkElement).toBeInTheDocument();
});
