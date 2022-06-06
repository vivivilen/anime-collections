import { useState } from 'react';
import styled from "@emotion/styled";
import Card from "../UI/Card";
import { useNavigate } from "react-router-dom";
import NoImage from "../../Images/no-image.png";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Form from "./Form";

const CollectionItemWrapper = styled.div`
  margin: 1.5rem auto;
  position: relative;
  // border: 1px solid black;
`;

const Title = styled.p`
  margin: 0.5rem 0.8rem;
`;

const ContainerIcon = styled.div`
  z-index: 5;
  position: absolute;
  right: 0;
  padding: 0.3rem;
`;

const Image = styled.img`
  width: 100%;
  height: 20rem;
`;

const CollectionItem = (props) => {
  const [isModalShown, setIsModalShown] = useState(false);
  const [numAnimeCollection, setNumAnimeCollection] = useState(
    localStorage.length
  );

  const {
    collectionName,
    onRemoveCollection
  } = props;

  let navigate = useNavigate();
  const getLocalImg = JSON.parse(localStorage.getItem(collectionName))[0]?.media
    ?.coverImage?.large;
  const coverImg = getLocalImg ? getLocalImg : NoImage;

  const setAnimeCollection = (data) => {
    setNumAnimeCollection(data);
  };

  const showModalHandler = () => {
    setIsModalShown(true);
  };

  const hideModalHandler = () => {
    setIsModalShown(false);
  };

  return (
    <CollectionItemWrapper>
      {isModalShown && (
        <Form
          params="removeCollection"
          onHide={hideModalHandler}
          animeCollection={numAnimeCollection}
          onSetAnimeCollection={setAnimeCollection}
          onRemoveCollection={() => {
            onRemoveCollection(collectionName);
            hideModalHandler();
          }}
          collectionName={collectionName}
        />
      )}
      <ContainerIcon onClick={showModalHandler}>
        <HighlightOffIcon fontSize="large" />
      </ContainerIcon>
      <Card
        onClick={() => {
          navigate("/collection-detail", { state: collectionName });
        }}
      >
        <Image src={coverImg}></Image>
        <Title>{collectionName}</Title>
      </Card>
    </CollectionItemWrapper>
  );
};

export default CollectionItem;
