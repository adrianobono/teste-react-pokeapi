import { useState } from "react";
import Modal from "../Modal/Modal";

function App() {
  const [isOpen, setIsOpen] = useState(false);

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
