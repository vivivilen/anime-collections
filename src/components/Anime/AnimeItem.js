import { useState } from "react";
import styled from "@emotion/styled";
import Card from "../UI/Card";
import { useNavigate } from "react-router-dom";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Form from "../AnimeCollection/Form";

const AnimeItemWrapper = styled.div`
  margin: 1rem auto;
  position: relative;
`;

const Title = styled.p`
  margin: 0.5rem 0.8rem;
`;

const Image = styled.img`
  width: 100%;
`;

const ContainerIcon = styled.div`
  z-index: 5;
  position: absolute;
  right: 0;
  padding: 0.3rem;
`;

const AnimeItem = (props) => {
  const [isModalShown, setIsModalShown] = useState(false);
  const { media } = props.animeData;
  console.log("propssss: ", props.animeData);

  const title = media.title.english ? media.title.english : media.title.native;
  let navigate = useNavigate();

  const showModalHandler = () => {
    setIsModalShown(true);
  };

  const hideModalHandler = () => {
    setIsModalShown(false);
  };

  return (
    <AnimeItemWrapper>
      {isModalShown && (
        <Form
          params="removeAnimeFromCollection"
          onHide={hideModalHandler}
          onRemoveAnime={() => {
            props.onRemoveAnime(props.animeData.id);
            hideModalHandler();
          }}
          animeTitle={title}
        />
      )}
      {props.hasDeleteIcon && (
        <ContainerIcon onClick={showModalHandler}>
          <HighlightOffIcon fontSize="large" />
        </ContainerIcon>
      )}
      <Card
        onClick={() => {
          console.log(media.title.english);
          navigate("/anime-detail", { state: props.animeData });
        }}
      >
        <Image src={media.coverImage.large} alt={media.title.english} />
        <Title>{title}</Title>
      </Card>
    </AnimeItemWrapper>
  );
};

export default AnimeItem;
