import { FunctionComponent } from "react";
import { BackgroundBattleship } from "src/assets";
import { devices } from "src/constants/devices";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: white;
  justify-content: center;
  align-items: center;
  background: url(${BackgroundBattleship});
  background-size: cover;
  gap: 30px;
`;

const Title = styled.h2`
  font-size: 40px;
  color: #ffa500;
`;
const StartButton = styled.button`
  width: 90%;
  padding: 10px;
  margin-bottom: 20px;
  background-color: #1666ee;
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  font-size: 30px;
  @media (${devices.tablet}) {
    width: 30%;
  }
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
