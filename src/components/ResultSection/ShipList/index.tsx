// Component to show ships list with sink status
import { FunctionComponent } from "react";
import styled from "styled-components";
import ShipItem from "./ShipItem";
import { devices } from "src/constants/devices";
import { ResultDataType } from "src/types/board";

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
type Props = {
  shipData: ResultDataType[];
};
const ShipList: FunctionComponent<Props> = ({ shipData }) => {
  return (
    <Container>
      {shipData.map((shipItem, index) => {
        return (
          <ShipItem
            size={shipItem.size}
            isSunk={shipItem.isSunk}
            shipName={shipItem.ship}
            key={shipItem.ship + index}
          />
        );
      })}
    </Container>
  );
};

export default ShipList;
