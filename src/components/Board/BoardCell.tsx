import styled from "styled-components";

const Tile = styled.div`
  min-width: 60px;
  min-height: 60px;
  cursor: pointer;
  border-left: 1px solid black;
  border-top: 1px solid black;
  &:last-child {
    border-right: 1px solid black;
  }
`;
const BoardCell = () => {
  return <Tile> </Tile>;
};

export default BoardCell;
