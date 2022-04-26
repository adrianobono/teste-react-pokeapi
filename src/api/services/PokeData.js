import config from "../../config";
import { useEffect, useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import axios from "axios";

function Pokedata(props) {
  const { setStartData, setPokemons, setPokeList } = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(`${config.POKE_URIAPI}20`);
        setStartData(response.results);
        setPokemons(response.results);
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
  }, [setPokeList, setPokemons, setStartData]);
}

export default Pokedata;
