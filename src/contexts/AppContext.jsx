import React, { useState, createContext } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState([]);
  const [pokelist, setPokeList] = useState([]);
  const [pokefavlist, setPokeFavList] = useState([]);
  const [startdata, setStartData] = useState([]);
  const [fav, setFav] = useState([]);
  const [modalData, setModalData] = useState([]);

  const setFavorite = (value) => {
    if (!fav.includes(Number(value))) {
      setFav([...fav, Number(value)]);
    } else {
      let arrayClean = [...fav];
      arrayClean.splice(arrayClean.indexOf(Number(value)), 1);
      setFav(arrayClean);
    }
  };

  const setInitialData = (data) => {
    setPokemons(data);
    setStartData(data);
  };

  const setInitialList = (data) => {
    setPokeList(data);
  };

  return (
    <AppContext.Provider
      value={{
        pokemons,
        startdata,
        pokelist,
        pokefavlist,
        setPokeFavList,
        fav,
        setFavorite,
        setPokemons,
        setPokeList,
        setStartData,
        modalData,
        setModalData,
        setInitialData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
