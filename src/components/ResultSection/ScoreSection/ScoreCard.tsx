// Component to show the score with player info
import { FunctionComponent } from "react";
import styled from "styled-components";

const Container = styled.div<{ backgroundColor?: string }>`
  padding: 10px 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${(props) => props.backgroundColor || "#ffffff"};
`;
const Name = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin: 0;
`;
const Score = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
`;
const Divider = styled.div`
  width: 100%;
  border-bottom: 1px solid black;
  margin: 10px 0;
`;

type Props = {
  backgroundColor?: string;
  score: number | string;
  playerName?: string;
};

const ScoreCard: FunctionComponent<Props> = ({
  backgroundColor,
  score,
  playerName,
}) => {
  return (
    <Container backgroundColor={backgroundColor}>
      <Score>{score}</Score>
      <Divider />
      <Name>{playerName}</Name>
    </Container>
  );
};

export default ScoreCard;
