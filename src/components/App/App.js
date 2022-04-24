import { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import PokeData from "../../api/services/PokeData";
import ListView from "../ListView/ListView";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  PokeData();

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>ViewPokeInfos</button>
      <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
        PokeInfo
      </Modal>
      <ListView />
    </div>
  );
}
export default App;
