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
  const context = useContext(AppContext);
  const [modalContent, setModalContent] = useState({
    id: "",
    url: "",
    name: "",
    imageUrl: "",
  });

  const filterPokemon = (value) => {
    if (value === "") {
      context.setPokemons(context.startdata);
      return;
    }

    const pokefilter = context.pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(value.toLowerCase())
    );

    pokefilter.length > 0
      ? context.setPokemons(pokefilter)
      : context.setPokemons(
          context.pokelist.filter((pokemon) =>
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

      <Container>
        {context &&
          context.pokemons &&
          context.pokemons.map((poke, index) => {
            const name = poke.name
              .trim()
              .toLowerCase()
              .replace(/\w\S*/g, (w) =>
                w.replace(/^\w/, (c) => c.toUpperCase())
              );
            let id = poke.url.slice(0, -1).split("/").at(-1);
            const imageurl = config.IMAGE_POKE + "/" + id + ".svg";
            id = Number(id) < 899 ? id : Number(id) - 9102;
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
                    }, 200);
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
                    }, 200);
                  }}
                >
                  <Image src={imageurl} alt="" />
                </ItemCard>
                <Rec />
                <ItemCard>
                  <Image
                    onClick={() => context.setFavorite(id, poke)}
                    src={`/images/${
                      context.fav.includes(Number(id)) ? "remfav" : "addfav"
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
              <ItemCard className="title">Nome: {modalContent.name}</ItemCard>
              <LazyLoad height={200} display={"flex"}>
                <PokeImage src={modalContent.imageUrl} />
              </LazyLoad>
            </ItemModal>

            <ItemModal className="item-bold item-col">
              {context.modalData && context.modalData.types && (
                <ItemCol>
                  <Item>Tipo: {context.modalData.types[0].type.name}</Item>
                  <Item>Altura: {context.modalData.height} metros</Item>
                  <Item>Peso: {context.modalData.weight} Kilos</Item>
                  <Item>
                    Habilidade: {context.modalData.abilities[0].ability.name}
                  </Item>
                </ItemCol>
              )}
            </ItemModal>
          </ModalCenter>
        </Modal>
      )}
    </div>
  );
};

export default ListView;
