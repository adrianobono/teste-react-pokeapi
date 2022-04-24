import React, { useState, createContext } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState([]);
  const [pokelist, setPokeList] = useState([]);
  const [startdata, setStartData] = useState([]);

  const changeData = (state, value) => {
    let set = eval(state);
    set(value);
  };

  return (
    <AppContext.Provider
      value={{
        pokemons,
        startdata,
        pokelist,
        changeData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
