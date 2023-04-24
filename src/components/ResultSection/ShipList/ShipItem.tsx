import { FunctionComponent } from "react";
import styled from "styled-components";
import { shipAssets } from "src/constants/shipsData";
import { HitSmall, MissSmall } from "src/assets";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;
const Ship = styled.img`
  width: 80px;
  height: 100%;
`;
const SizeContainer = styled.div``;
const ShunkStatus = styled.img`
  width: 20px;
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
              <ShunkStatus
                key={item + index + shipName}
                src={isSunk ? HitSmall : MissSmall}
                alt={isSunk ? "HitSmall" : "MissSmall"}
              ></ShunkStatus>
            );
          })}
      </SizeContainer>
    </Container>
  );
};
export default ShipItem;
