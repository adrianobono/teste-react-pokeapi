import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  justify-content: space-between;
  overflow-y: auto;
  height: 55vh;
  margin-bottom: 20px;
  ::-webkit-scrollbar {
    width: 12px;
    height: 10px;
  }

  ::-webkit-scrollbar-button:start:decrement,
  ::-webkit-scrollbar-button:end:increment {
    display: none;
  }

  ::-webkit-scrollbar-track-piece {
    background-color: #3b3b3b;
    -webkit-border-radius: 6px;
  }

  ::-webkit-scrollbar-thumb:vertical {
    background-color: #ffd51e;
    -webkit-border-radius: 6px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const ModalCenter = styled.div`
  display: flex;
  justify-content: center;
`;

export const List = styled.div`
  display: flex;
  color: white;
  background-color: #585656;
  width: 45vw;
  flex: 1;
  max-width: 60vw;
  align-items: center;
  justify-content: space-between;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  border-right: 4px solid #ffaa00;
  margin: 5px;
  max-height: 70px;

  &.item-none {
    display: none;
  }
`;

export const ItemCol = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 5px;
  cursor: pointer;
`;
export const Rec = styled.div`
  width: 7px;
  background-color: white;
  height: 100%;
  transform: skewX(-20deg);
`;

export const ItemCard = styled.div`
  display: flex;
  cursor: pointer;
  &.title {
    padding: 5px;
    height: 30px;
    margin-top: --20px;
    background-color: #585656;
  }
`;

export const Item = styled.div`
  width: 5vw;
  display: flex;
  width: 25vw;
  flex: 1;
  text-decoration: none;
  margin: 5px;

  &.item-msg {
    padding: 5px;
  }

  &.item-col {
    flex-direction: column;
  }

  &.item-bold {
    font-weight: 500;
    letter-spacing: 2px;
    font-size: 1.1rem;
  }
`;

export const ItemModal = styled.div`
  display: flex;
  width: 50%;
  flex: 1;
  text-decoration: none;
  margin: 5px;

  &.item-msg {
    padding: 5px;
  }

  &.item-col {
    flex-direction: column;
  }

  &.item-bold {
    font-weight: 500;
    letter-spacing: 2px;
    font-size: 1.1rem;
  }
`;

export const Image = styled.img`
  width: 64px;
  height: 64px;
  padding-left: 15px;
  padding-right: 15px;
  flex: 1;
  cursor: pointer;
`;

export const PokeImage = styled.img`
  width: 200px;
  height: 200px;
`;
export const Favorite = styled.div`
  width: 64px;
  height: 64px;
`;
