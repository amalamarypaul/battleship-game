// Component to show ships list with sink status
import { FunctionComponent } from "react";
import styled from "styled-components";
import { useBoardContext } from "src/hooks/useBoardContext";
import ShipItem from "./ShipItem";
import { devices } from "src/constants/devices";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 15px 10px;
  gap: 10px;
  max-height: 80px;
  @media (${devices.tablet}) {
    padding: 0px;
    max-height: 100px;
  }
  @media (${devices.laptop}) {
    max-height: unset;
    margin-top: 30px;
  }
`;

const ShipList: FunctionComponent = () => {
  const { resultData } = useBoardContext();
  return (
    <Container>
      {resultData.map((resultItem, index) => {
        return (
          <ShipItem
            size={resultItem.size}
            isSunk={resultItem.isSunk}
            shipName={resultItem.ship}
            key={resultItem.ship + index}
          />
        );
      })}
    </Container>
  );
};

export default ShipList;
