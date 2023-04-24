import { devices } from "src/constants/devices";
import styled from "styled-components";

const Tile = styled.div`
  width: calc(95vw / 10);
  height: calc(95vw / 10);
  cursor: pointer;
  border-left: 1px solid black;
  border-top: 1px solid black;
  &:last-child {
    border-right: 1px solid black;
  }
  @media (${devices.laptop}) {
    width: 60px;
    height: 60px;
  }
`;
const BoardCell = () => {
  return <Tile> </Tile>;
};

export default BoardCell;
