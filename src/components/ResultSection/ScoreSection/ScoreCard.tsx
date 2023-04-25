// Component to show the score with player info
import { FunctionComponent } from "react";
import { devices } from "src/constants/devices";
import styled from "styled-components";

const Container = styled.div<{ backgroundColor?: string }>`
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.backgroundColor || "#ffffff"};
  flex: 1;
  @media (${devices.tablet}) {
    flex: unset;
  }
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
