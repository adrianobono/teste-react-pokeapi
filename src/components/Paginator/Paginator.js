import React from "react";
import { useContext, useState, useEffect } from "react";
import { Pagination } from "react-pagination-bar";
import { AppContext } from "../../contexts/AppContext";
import axios from "axios";
import "react-pagination-bar/dist/index.css";
import config from "../../config";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  justify-content: center;
  overflow-y: auto;
  height: 55vh;
  margin-bottom: 20px;
  margin-top: 20px;
`;

function Paginator() {
  const [pg, setPg] = useState(0);
  const context = useContext(AppContext);

  useEffect(() => {
    if (pg > 0 && context.pokelist.length > 21) {
      const fetchData = async () => {
        try {
          const { data: response } = await axios.get(
            `${config.POKE_URIAPI_OFF}${(pg - 1) * 20}&limit=20`
          );
          context.setPokemons(response.results);
          context.setStartData(response.results);
        } catch (error) {
          console.error(error.message);
        }
      };
      fetchData();
    }
  }, [pg]);

  return (
    <Container>
      {context && context.pokelist && context.pokelist.length > 20 && (
        <Pagination
          startLabel="Início"
          endLabel="Fim"
          nextLabel="Próxima"
          prevLabel="Voltar"
          initialPage={1}
          itemsPerPage={20}
          onPageСhange={(e) => setPg(e)}
          totalItems={context.pokelist.length}
          pageNeighbours={6}
        />
      )}
    </Container>
  );
}

export default Paginator;
