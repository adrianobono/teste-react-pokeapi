import React, { useState, createContext } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState([]);
  const [pokelist, setPokeList] = useState([]);
  const [startdata, setStartData] = useState([]);
  const [fav, setFav] = useState([]);

  const changeData = (state, value) => {
    let set = eval(state);
    set(value);
  };

  const setFavorite = (value) => {
    if (!fav.includes(Number(value))) {
      setFav([...fav, Number(value)]);
    } else {
      let temp = [...fav];
      temp.splice(temp.indexOf(Number(value)), 1);
      setFav(temp);
    }
    console.log(fav);
  };

  return (
    <AppContext.Provider
      value={{
        pokemons,
        startdata,
        pokelist,
        fav,
        changeData,
        setFavorite,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
