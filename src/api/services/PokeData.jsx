import config from "../../config";
import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import axios from "axios";

function Pokedata(value) {
  const { setPokemons, setStartData, setPokeList } = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(`${config.POKE_URIAPI}20`);
        setPokemons(response.results);
        setStartData(response.results);
        fetcPokeList(response.count);
      } catch (error) {
        console.error(error.message);
      }
    };
    const fetcPokeList = async (count) => {
      try {
        const { data: response } = await axios.get(
          `${config.POKE_URIAPI}${count}`
        );
        setPokeList(response.results);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);
}

export default Pokedata;
