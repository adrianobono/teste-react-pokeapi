import { useContext, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
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
} from "./ListView.styled";

import Modal from "../Modal/Modal";

const ListViewFilter = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { pokelist, fav, setFavorite } = useContext(AppContext);

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
            const id = poke.url.slice(0, -1).split("/").at(-1);
            const imageurl = config.IMAGE_POKE + "/" + id + ".png";

            return (
              <List key={index}>
                <ItemCol onClick={(e) => setIsOpen(true)}>
                  <Item className="item-bold">
                    ({Number(id) < 1000 ? id : Number(id) - 9103}){" " + name}
                  </Item>
                </ItemCol>
                <Rec />
                <ItemCard onClick={(e) => setIsOpen(true)}>
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

      <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
        ajdldfjadkjfa
      </Modal>
    </div>
  );
};

export default ListViewFilter;
