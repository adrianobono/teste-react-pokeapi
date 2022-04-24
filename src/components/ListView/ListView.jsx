import React from "react";
import { useContext, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import { DebounceInput } from "react-debounce-input";
import config from "../../config";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
`;

const List = styled.div`
  display: flex;
  border: 1px solid blue;
  flex: 1;
  align-items: center;
  justify-content: space-between;

  padding: 5px;
  margin: 5px;
`;

const ItemCard = styled.div`
  display: fex;
`;

const Item = styled.div`
  width: 10vw;
  margin-right: 5px;
  display: flex;
  text-decoration: none;

  margin: 5px;
  &.item-bold {
    font-weight: 500;
    letter-spacing: 2px;
  }
`;

const Image = styled.img`
  width: 64px;
  height: 64px;
  cursor: pointer;
`;

const Favorite = styled.div`
  width: 64px;
  height: 64px;
`;

function ListView() {
  const { pokemons, startdata, pokelist, changeData, fav, setFavorite } =
    useContext(AppContext);

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
      <Container>
        {pokemons &&
          pokemons.map((poke) => {
            const name = poke.name
              .trim()
              .toLowerCase()
              .replace(/\w\S*/g, (w) =>
                w.replace(/^\w/, (c) => c.toUpperCase())
              );
            const id = poke.url.slice(0, -1).split("/").at(-1);
            const imageurl = config.IMAGE_POKE + "/" + id + ".png";

            return (
              <List>
                <Item>
                  <Item>
                    <Item className="item-bold">({id})</Item>
                    <Item>{name}</Item>
                  </Item>
                </Item>
                <ItemCard>
                  <Image src={imageurl ? imageurl : ""} alt="" />
                </ItemCard>

                <ItemCard>
                  <Image
                    onClick={() => setFavorite(id)}
                    src={`/images/${
                      fav.includes(Number(id)) ? "remfav" : "addfav"
                    }.png`}
                    alt=""
                  />
                </ItemCard>
              </List>
            );
          })}
      </Container>
    </div>
  );
}

export default ListView;
