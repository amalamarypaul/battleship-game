import { FunctionComponent } from "react";
import { Board, ResultSection } from "src/components";
import styled from "styled-components";
import { devices } from "src/constants/devices";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  width: 100%;
  @media (${devices.laptop}) {
    flex-direction: row-reverse;
    gap: 20px;
    margin: 20px auto;
  }
`;
const Game: FunctionComponent = () => {
  return (
    <Container data-testid="battleship">
      <Board />
      <ResultSection />
    </Container>
  );
};

export default Game;
