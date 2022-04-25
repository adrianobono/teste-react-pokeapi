import React from "react";
import { useContext, useState, useEffect } from "react";
import { Pagination } from "react-pagination-bar";
import { AppContext } from "../../contexts/AppContext";
import Pokedata from "../../api/services/PokeData";
import axios from "axios";
import "react-pagination-bar/dist/index.css";
import config from "../../config";

function Paginator() {
  const [pg, setPg] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { pokelist, setPokemons, setPage, setStartData } =
    useContext(AppContext);

  useEffect(() => {
    if (pg > 0 && pokelist.length > 21) {
      const fetchData = async () => {
        try {
          const { data: response } = await axios.get(
            `${config.POKE_URIAPI_OFF}${(pg - 1) * 20}&limit=20`
          );
          setPokemons(response.results);
          setStartData(response.results);

          setPage(pg - 1);
        } catch (error) {
          console.error(error.message);
        }
      };
      fetchData();
    }
  }, [pg]);

  return (
    <div>
      {pokelist && pokelist.length > 20 && (
        <Pagination
          startLabel="Inicio"
          endLabel="Fim"
          nextLabel="Prox"
          prevLabel="Voltar"
          initialPage={1}
          itemsPerPage={20}
          onPageСhange={(e) => setPg(e)}
          totalItems={pokelist && pokelist.length}
          pageNeighbours={8}
        />
      )}
    </div>
  );
}

export default Paginator;
