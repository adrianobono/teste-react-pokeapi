import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ListView from "../ListView/ListView";
import ListViewFilter from "../ListView/ListViewFilter";
import styled from "styled-components";
import Paginator from "../Paginator/Paginator";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-left: 1px solid #acacac;
  border-right: 1px solid #acacac;
  border-bottom: 1px solid #acacac;
  border-radius: 5px;
  border-top: 0;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  padding: 10px;
  margin-top: -11px;
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
      <Paginator />
    </TabPanel>
    <TabPanel>
      <Container>
        <ListViewFilter filter={true} />
      </Container>
    </TabPanel>
  </Tabs>
);
