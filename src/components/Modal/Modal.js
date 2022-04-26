import { useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import ReactPortal from "../ReactPortal";
import axios from "axios";

const ModalStack = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  z-index: 999;
  padding: 40px 20px 20px;
  opacity: 0;
  pointer-events: ${(props) => (props.isOpen ? "none" : "auto")};

  &.modal-enter-done {
    opacity: 1;
    pointer-events: auto;
    transform: scale(1);
  }

  &.modal-exit {
    opacity: 0;
    transform: scale(0.4);
  }
`;

const ModalContent = styled.div`
  display: flex;
  justify-content: center;
  width: 60%;
  height: 50%;
  background-color: #282c34;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
`;

const ExitBtn = styled.button`
  cursor: pointer;
  border: 0;
  color: #ffd51e;
  font-weight: 500;
  font-size: 1rem;
  background-color: #585656;
`;

function Modal({ children, isOpen, handleClose, pokedata }) {
  const nodeRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(`${pokedata.url}`);
        console.log(response);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, [pokedata]);

  useEffect(() => {
    const closeOnEscapeKey = (e) => (e.key === "Escape" ? handleClose() : null);
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <CSSTransition
        in={isOpen}
        timeout={300}
        unmountOnExit
        classNames="modal"
        nodeRef={nodeRef}
      >
        <ModalStack ref={nodeRef}>
          <ExitBtn onClick={handleClose}>Sair X</ExitBtn>
          <ModalContent>{children}</ModalContent>
        </ModalStack>
      </CSSTransition>
    </ReactPortal>
  );
}
export default Modal;
