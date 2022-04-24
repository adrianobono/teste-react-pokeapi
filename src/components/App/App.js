import { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import PokeData from "../../api/services/PokeData";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  PokeData();

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>ViewPokeInfos</button>
      <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
        PokeInfo
      </Modal>
    </div>
  );
}
export default App;
