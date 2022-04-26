import React, { useState, createContext, useEffect } from "react";

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
      setTimeout(() => {
        setFav([...fav, Number(value)]);
      }, 200);
      localStorage.setItem("data", JSON.stringify(fav));
    } else {
      let arrayClean = [...fav];
      arrayClean.splice(arrayClean.indexOf(Number(value)), 1);
      setFav(arrayClean);
      localStorage.setItem("data", JSON.stringify(arrayClean));
    }
  };

  useEffect(() => {
    if (fav.length > 0) localStorage.setItem("data", JSON.stringify(fav));
    else {
    }
  }, [fav]);

  useEffect(() => {
    if (localStorage.getItem("data")) {
      if (JSON.parse(localStorage.getItem("data")).length > 0) {
        setFav(JSON.parse(localStorage.getItem("data")));
      }
    }
  }, []);

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
        setInitialList,
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
