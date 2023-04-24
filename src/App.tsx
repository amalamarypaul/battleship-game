import { Board } from "./components";
import styled from "styled-components";

const Container = styled.div`
  margin: 20px;
`;
function App() {
  return (
    <Container>
      <Board />
      <footer>
        <a href="https://www.flaticon.com/free-icons/ship" title="ship icons">
          Ship icons created by Freepik - Flaticon
        </a>
      </footer>
    </Container>
  );
}

export default App;
