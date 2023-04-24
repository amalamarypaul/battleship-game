// Component to show the Results section which include the score and ships list with sink status
//Component to show the result section which include score and ship list
import { FunctionComponent } from "react";
import styled from "styled-components";
import ScoreSection from "./ScoreSection";
import ShipList from "./ShipList";
import { devices } from "src/constants/devices";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  @media (${devices.tablet}) {
    flex-direction: row;
  }
  @media (${devices.laptop}) {
    flex-direction: column;
  }
`;
const ResultSection: FunctionComponent = () => {
  return (
    <Container>
      <ScoreSection />
      <ShipList />
    </Container>
  );
};

export default ResultSection;
