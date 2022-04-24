import config from "../../config";
import React, { useEffect, useState } from "react";
import axios from "axios";

function Pokedata() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(`${config.POKE_URIAPI}20`);
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
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);
}

export default Pokedata;
