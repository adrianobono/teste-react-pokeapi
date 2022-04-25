import { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import PokeData from "../../api/services/PokeData";
import ListView from "../ListView/ListView";
import Tabs from "../Tabs/Tabs";
import Paginator from "../Paginator/Paginator";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  PokeData();

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>ViewPokeInfos</button>
      <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
        PokeInfo
      </Modal>
      <Tabs />
      <Paginator />
    </div>
  );
}
export default App;
