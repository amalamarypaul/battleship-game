import { useState } from "react";
import styled from "styled-components";
import { Game, StartPage } from "./pages";
import { devices } from "./constants/devices";

const Container = styled.div`
  @media (${devices.tablet}) {
    margin: 20px;
  }
  @media (${devices.laptop}) {
    margin: 0px;
  }
`;
function App() {
  const [showStartPage, setShowStartPage] = useState(true);
  return (
    <Container>
      {showStartPage ? (
        <StartPage onClickStart={() => setShowStartPage(false)}></StartPage>
      ) : (
        <Game onClickCancel={() => setShowStartPage(true)} />
      )}
    </Container>
  );
}

export default App;
