import { useContext, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import { DebounceInput } from "react-debounce-input";
import LazyLoad from "react-lazyload";
import config from "../../config";

import {
  Container,
  Header,
  List,
  ItemCol,
  Rec,
  ItemCard,
  Item,
  Image,
  PokeImage,
  ModalCenter,
  ItemModal,
} from "./ListView.styled";

import Modal from "../Modal/Modal";

const ListView = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    id: "",
    url: "",
    name: "",
    imageUrl: "",
  });
  const { pokemons, setPokemons, startdata, pokelist, fav, setFavorite } =
    useContext(AppContext);

  const filterPokemon = (value) => {
    if (value === "") {
      setPokemons(startdata);
      return;
    }

    const pokefilter = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(value.toLowerCase())
    );

    pokefilter.length > 0
      ? setPokemons(pokefilter)
      : setPokemons(
          pokelist.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(value.toLowerCase())
          )
        );
  };

  return (
    <div>
      {!props.filter && (
        <Header>
          <DebounceInput
            placeholder={"Busque seu pokémon favorito..."}
            className="Item"
            minLength={1}
            debounceTimeout={300}
            onChange={(e) => {
              filterPokemon(e.target.value);
            }}
          />
        </Header>
      )}
      {props.filter && (
        <Header>
          <List>
            <Item className="item-msg">
              {fav.length === 0 &&
                "Oops, você ainda não favoritou nehum pokémon..."}
              {fav.length > 0 &&
                fav.length < 4 &&
                "Boa a sua jornada já está começando..."}
              {fav.length > 4 &&
                " Agora sim você já se tornou um caçador de pokémons..."}
            </Item>
          </List>
        </Header>
      )}
      <Container>
        {pokemons &&
          pokemons.map((poke, index) => {
            const name = poke.name
              .trim()
              .toLowerCase()
              .replace(/\w\S*/g, (w) =>
                w.replace(/^\w/, (c) => c.toUpperCase())
              );
            let id = poke.url.slice(0, -1).split("/").at(-1);
            const imageurl = config.IMAGE_POKE + "/" + id + ".svg";
            id = Number(id) < 1000 ? id : Number(id) - 9103;
            return (
              <List key={index}>
                <ItemCol
                  onClick={(e) => {
                    setModalContent({
                      id: id,
                      url: poke.url,
                      name: name,
                      imageUrl: imageurl,
                    });
                    setTimeout(() => {
                      setIsOpen(true);
                    }, 500);
                  }}
                >
                  <Item className="item-bold">
                    ({id}){" " + name}
                  </Item>
                </ItemCol>
                <Rec />
                <ItemCard
                  onClick={(e) => {
                    setModalContent({
                      id: id,
                      url: poke.url,
                      name: name,
                      imageUrl: imageurl,
                    });
                    setTimeout(() => {
                      setIsOpen(true);
                    }, 500);
                  }}
                >
                  <Image src={imageurl} alt="" />
                </ItemCard>
                <Rec />
                <ItemCard>
                  <Image
                    onClick={() => setFavorite(id, poke)}
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

      {modalContent && modalContent.imageUrl !== "" && (
        <Modal
          handleClose={() => setIsOpen(false)}
          isOpen={isOpen}
          pokedata={modalContent}
        >
          <ModalCenter>
            <ItemModal className="item-bold item-col">
              <ItemCard>Nome: {modalContent.name}</ItemCard>

              <LazyLoad height={200}>
                <PokeImage src={modalContent.imageUrl} />
              </LazyLoad>
            </ItemModal>

            <ItemModal className="item-bold item-col">
              <ItemCard>Tipo: {modalContent.name}</ItemCard>
            </ItemModal>
          </ModalCenter>
        </Modal>
      )}
    </div>
  );
};

export default ListView;
