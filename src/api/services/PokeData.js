import config from "../../config";
import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import axios from "axios";

function Pokedata() {
  const { changeData } = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(`${config.POKE_URIAPI}20`);
        changeData("setPokemons", response.results);
        changeData("setStartData", response.results);
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
        changeData("setPokeList", response.results);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);
}

export default Pokedata;
