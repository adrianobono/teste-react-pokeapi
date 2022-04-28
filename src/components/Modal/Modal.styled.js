import styled from "styled-components";

export const ModalStack = styled.div`
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

export const ModalContent = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
  height: 50%;
  background-color: #282c34;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  border: 2px solid white;
`;

export const ExitBtn = styled.button`
  cursor: pointer;
  border: 0;
  color: #ffd51e;
  font-weight: 500;
  width: 8vw;
  font-size: 1.2rem;
  padding: 3px;
  background-color: #585656;
`;
