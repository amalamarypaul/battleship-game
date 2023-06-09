// Component to show the Results section which include the score and ships list with sink status
//Component to show the result section which include score and ship list
import { FunctionComponent, useMemo } from "react";
import styled from "styled-components";
import ScoreSection from "./ScoreSection";
import ShipList from "./ShipList";
import { devices } from "src/constants/devices";
import { useBoardContext } from "src/hooks/useBoardContext";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  @media (${devices.tablet}) {
    gap: 40px;
    flex-direction: row;
    margin-top: 30px;
  }
  @media (${devices.laptop}) {
    gap: 0;
    flex-direction: column;
    max-width: 300px;
    margin-top: 0px;
  }
`;

const ResultSection: FunctionComponent = () => {
  const { resultData } = useBoardContext();
  const shipList = useMemo(
    () => <ShipList shipData={resultData} />,
    [resultData]
  );
  return (
    <Container>
      <ScoreSection />
      {shipList}
    </Container>
  );
};

export default ResultSection;
