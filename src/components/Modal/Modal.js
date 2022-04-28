import { useEffect, useRef, useContext } from "react";
import { CSSTransition } from "react-transition-group";
import { AppContext } from "../../contexts/AppContext";
import ReactPortal from "../ReactPortal";
import axios from "axios";
import { ExitBtn, ModalStack, ModalContent } from "./Modal.styled";

function Modal({ children, isOpen, handleClose, pokedata }) {
  const context = useContext(AppContext);
  const nodeRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      if (pokedata && pokedata.url) {
        try {
          const { data: response } = await axios.get(`${pokedata?.url}`);
          context.setModalData(response);
        } catch (error) {
          console.error(error.message);
        }
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
