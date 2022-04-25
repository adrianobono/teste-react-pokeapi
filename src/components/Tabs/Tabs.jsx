import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ListView from "../ListView/ListView";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-left: 1px solid blue;
  border-right: 1px solid blue;
  border-bottom: 1px solid blue;
  border-radius: 5px;
  border-top: 0;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  padding: 10px;
  margin-top: -10px;
`;

export default () => (
  <Tabs>
    <TabList>
      <Tab>Pokebusca</Tab>
      <Tab>Favoritos</Tab>
    </TabList>

    <TabPanel>
      <Container>
        <ListView filter={false} />
      </Container>
    </TabPanel>
    <TabPanel>
      <Container>
        <ListView filter={true} />
      </Container>
    </TabPanel>
  </Tabs>
);
