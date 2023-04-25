import { useState } from "react";
import styled from "styled-components";
import { Game, StartPage } from "./pages";
import { devices } from "./constants/devices";

const Container = styled.div<{ $shouldMargin?: boolean }>`
  @media (${devices.tablet}) {
    margin: ${(props) => (props.$shouldMargin ? "20px" : 0)};
  }
  @media (${devices.laptop}) {
    margin: 0px;
  }
`;
function App() {
  const [showStartPage, setShowStartPage] = useState(true);
  return (
    <Container $shouldMargin={!showStartPage}>
      {showStartPage ? (
        <StartPage onClickStart={() => setShowStartPage(false)}></StartPage>
      ) : (
        <Game onClickCancel={() => setShowStartPage(true)} />
      )}
    </Container>
  );
}

export default App;
