import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../contexts/AppContext";
import { DebounceInput } from "react-debounce-input";
import config from "../../config";
import styled from "styled-components";

import Modal from "../Modal/Modal";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  justify-content: space-between;
  overflow-y: auto;

  height: 60vh;
  margin-bottom: 20px;
`;

const List = styled.div`
  display: flex;
  color: white;
  background-color: #585656;
  width: 45vw;
  align-items: center;
  justify-content: space-between;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  border-right: 4px solid #ffaa00;
  margin: 5px;
  max-height: 70px;

  &.item-none {
    display: none;
  }
`;

const ItemCol = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 5px;
`;
const Rec = styled.div`
  width: 7px;
  background-color: white;
  height: 100%;
  transform: skewX(-20deg);
`;

const ItemCard = styled.div`
  display: flex;
`;

const Item = styled.div`
  width: 5vw;
  display: flex;
  width: 25vw;
  flex: 1;
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
  padding-left: 15px;
  padding-right: 15px;
  flex: 1;
  cursor: pointer;
`;

const Favorite = styled.div`
  width: 64px;
  height: 64px;
`;

const ListView = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const { url, setUrl, page } = useState(null);

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
      {!props.filter && (
        <DebounceInput
          minLength={1}
          debounceTimeout={300}
          onChange={(e) => {
            filterPokemon(e.target.value);
          }}
        />
      )}

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
              <List
                onClick={(e) => setUrl(url, poke.url)}
                className={
                  props.filter && !fav.includes(Number(id)) ? "item-none" : ""
                }
              >
                <ItemCol>
                  <Item className="item-bold">
                    ({id}){" " + name}
                  </Item>
                </ItemCol>
                <Rec />
                <ItemCard>
                  <Image src={imageurl} alt="" />
                </ItemCard>
                <Rec />
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

      <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
        ajdldfjadkjfa
      </Modal>
    </div>
  );
};

export default ListView;
