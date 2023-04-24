// Component to show the score with player info
import { FunctionComponent } from "react";
import styled from "styled-components";

import ScoreCard from "./ScoreCard";
import { colors } from "src/constants/colors";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 0;
`;

const ScoreSection: FunctionComponent = () => {
  return (
    <Container>
      <ScoreCard
        score={"00"}
        playerName="Player 1"
        backgroundColor={colors.primaryColor}
      />
      <ScoreCard
        score={"00"}
        playerName="Player 2"
        backgroundColor={colors.secondaryColor}
      />
    </Container>
  );
};

export default ScoreSection;
