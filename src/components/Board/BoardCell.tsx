import styled from "styled-components";

const Tile = styled.div`
  width: 100%;
  height: 100%;
  min-width: 60px;
  min-height: 60px;
  cursor: pointer;
  &:not(:first-child) {
    border-left: 1px solid black;
  }
`;
const BoardCell = () => {
  return <Tile> </Tile>;
};

export default BoardCell;
