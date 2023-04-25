import { FunctionComponent } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: white;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 40px;
  color: brown;
`;
const StartButton = styled.button`
  width: 30%;
  padding: 10px;
  margin-bottom: 20px;
  background-color: green;
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  font-size: 30px;
`;

type Props = {
  onClickStart: () => void;
};
const StartPage: FunctionComponent<Props> = ({ onClickStart }) => {
  return (
    <Container>
      <Title> Battleship</Title>
      <StartButton onClick={onClickStart}>Start Game</StartButton>
    </Container>
  );
};
export default StartPage;
