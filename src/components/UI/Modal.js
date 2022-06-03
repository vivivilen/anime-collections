import { Fragment } from "react";
import ReactDOM from "react-dom";
import styled from "@emotion/styled";

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.75);
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 20vh;
  left: 15%;
  width: 70%;
  background-color: white;
  padding: 1rem;
  border-radius: 7px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  z-index: 30;

  @media (max-width: 480px) {
    width: 80%;
    left: 10%;
  }
`;

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClick={props.onHide}/>, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>
          <div>{props.children}</div>
        </ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
