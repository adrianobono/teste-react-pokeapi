import React from "react";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { DebounceInput } from "react-debounce-input";
import styled from "styled-components";

const List = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid blue;
  width: 40vw;
  padding: 5px;
  margin: 5px;
`;

function ListView() {
  const { pokemons, startdata, pokelist, changeData } = useContext(AppContext);
  const filterPokemon = (value) => {
    if (value === "") {
      changeData("setPokemons", startdata);
      return;
    }

    const pokefilter = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(value.toLowerCase())
    );

    pokefilter.length > 0
      ? changeData("setPokemons", pokefilter)
      : changeData(
          "setPokemons",
          pokelist.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(value.toLowerCase())
          )
        );
  };

  return (
    <div>
      <DebounceInput
        minLength={1}
        debounceTimeout={300}
        onChange={(e) => {
          filterPokemon(e.target.value);
        }}
      />
      {pokemons &&
        pokemons.map((poke) => {
          return <List>{poke.name}</List>;
        })}
    </div>
  );
}

export default ListView;
