import { FunctionComponent } from "react";
import styled from "styled-components";
import { shipAssets } from "src/constants/shipsData";
import { HitSmall, MissSmall } from "src/assets";
import { devices } from "src/constants/devices";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;
const Ship = styled.img`
  width: 60px;
  height: 100%;
  @media (${devices.mobile}) {
    width: 65px;
  }
  @media (${devices.tablet}) {
    width: 80px;
  }
`;
const SizeContainer = styled.div`
  display: flex;
`;
const SunkStatus = styled.img`
  width: 10px;
  height: 10px;
  @media (${devices.mobile}) {
    width: 12px;
    height: 12px;
  }
  @media (${devices.tablet}) {
    width: 20px;
    height: 20px;
  }
`;

type Props = {
  size: number;
  shipName: string;
  isSunk: boolean;
};

const ShipItem: FunctionComponent<Props> = ({ isSunk, size, shipName }) => {
  return (
    <Container>
      <Ship src={shipAssets[shipName]} alt={shipName}></Ship>
      <SizeContainer>
        {Array(size)
          .fill(0)
          .map((item, index) => {
            return (
              <SunkStatus
                key={item + index + shipName}
                src={isSunk ? HitSmall : MissSmall}
                alt={isSunk ? "HitSmall" : "MissSmall"}
              ></SunkStatus>
            );
          })}
      </SizeContainer>
    </Container>
  );
};
export default ShipItem;
