import { FunctionComponent } from "react";
import { colors } from "src/constants/colors";
import styled, { keyframes } from "styled-components";
import { devices } from "src/constants/devices";

const Container = styled.div`
  z-index: 1;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
`;
const animation = keyframes`

  from {
    scale:0;
    opacity:0;
  }
  to {
    scale:1;
    opacity:1;
  }
`;

const Content = styled.div`
  background-color: rgba(255, 255, 255, 1);
  width: 95%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  animation: ${animation} 400ms ease-in-out;
  @media (${devices.mobile}) {
    width: 80%;
  }
  border-radius: 5px;
  @media (${devices.tablet}) {
    width: 60%;
  }
`;
const Title = styled.h3`
  font-size: 38px;
  color: brown;
`;
const Description = styled.p`
  font-size: 28px;
  color: ${colors.primaryColor};
`;
const OkButton = styled.button`
  width: 35%;
  padding: 10px;
  margin-bottom: 20px;
  background-color: green;
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  @media (${devices.tablet}) {
    width: 40%;
    font-size: 20px;
  }
`;
const CancelButton = styled.button`
  background-color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
`;
type Props = {
  title?: string;
  description?: string;
  okClick: () => void;
  okText?: string;
  cancelClick?: () => void;
  cancelText?: string;
};
const Modal: FunctionComponent<Props> = ({
  title,
  description,
  okClick,
  cancelClick,
  okText,
  cancelText,
}) => {
  return (
    <Container>
      <Content>
        <Title>{title || "You Won !! 🥳"}</Title>
        <Description>{description || ""} </Description>
        <OkButton onClick={okClick}>{okText || "Play Again"}</OkButton>
        <CancelButton onClick={cancelClick}>
          {cancelText || "Go Back"}
        </CancelButton>
      </Content>
    </Container>
  );
};

export default Modal;
