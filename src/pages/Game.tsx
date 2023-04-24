import { FunctionComponent } from "react";
import { Board, ResultSection } from "src/components";
import styled from "styled-components";
import { devices } from "src/constants/devices";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  @media (${devices.laptop}) {
    flex-direction: row-reverse;
  }
`;
const Game: FunctionComponent = () => {
  return (
    <Container>
      <Board />
      <ResultSection />
    </Container>
  );
};

export default Game;
