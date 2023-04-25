// Component to show ships list with sink status
import { FunctionComponent } from "react";
import styled from "styled-components";
import { useBoardContext } from "src/hooks/useBoardContext";
import ShipItem from "./ShipItem";

const Container = styled.div`
  margin-top: 30px;
  gap: 40px;
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
