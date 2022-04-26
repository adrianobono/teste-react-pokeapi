import PokeData from "../../api/services/PokeData";
import styled from "styled-components";

import Tabs from "../Tabs/Tabs";

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

function App() {
  PokeData();
  return (
    <Container>
      <img
        height="100"
        src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"
      />
      <Tabs />
    </Container>
  );
}
export default App;
