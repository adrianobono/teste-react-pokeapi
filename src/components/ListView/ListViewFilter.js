import { useContext, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
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

const ListViewFilter = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const context = useContext(AppContext);
  const { pokelist, fav, setFavorite } = useContext(AppContext);
  const [modalContent, setModalContent] = useState({
    id: "",
    url: "",
    name: "",
    imageUrl: "",
  });
  return (
    <div>
      <Header>
        <List>
          <Item className="item-msg">
            {fav.length === 0 &&
              "Oops você ainda não favoritou nehum pokémon..."}
            {fav.length > 0 &&
              fav.length < 4 &&
              "Boa a sua jornada já está começando..."}

            {fav.length > 4 &&
              " Agora sim você já se tornou um caçador de pokémons..."}
          </Item>
        </List>
      </Header>

      <Container>
        {fav &&
          fav.length > 0 &&
          fav.map((indice, index) => {
            if (indice > 10000) indice = indice - 9102;
            let poke = pokelist[indice - 1];
            const name = poke.name
              .trim()
              .toLowerCase()
              .replace(/\w\S*/g, (w) =>
                w.replace(/^\w/, (c) => c.toUpperCase())
              );
            let id = poke.url.slice(0, -1).split("/").at(-1);
            const imageurl = config.IMAGE_POKE + "/" + id + ".svg";
            id = Number(id) < 1000 ? id : Number(id) - 9102;
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
                    ({Number(id) < 10000 ? id : Number(id) - 9103}){" " + name}
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
                  <Image src={imageurl ? imageurl : ""} alt="" />
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

export default ListViewFilter;
