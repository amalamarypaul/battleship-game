import { useState } from "react";
import styled from "styled-components";
import { Game, StartPage } from "./pages";

const Container = styled.div`
  margin: 20px;
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

      <footer>
        <a href="https://www.flaticon.com/free-icons/ship" title="ship icons">
          Ship icons created by Freepik - Flaticon
        </a>
      </footer>
    </Container>
  );
}

export default App;
