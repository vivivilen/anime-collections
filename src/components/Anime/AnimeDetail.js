import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import Header from "../Layout/Header";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Form from "../AnimeCollection/Form";

const DetailContainer = styled.section`
  max-width: 70rem;
  width: 90%;
  margin: 2rem auto;
  padding-bottom: 4rem;
`;

const BannerCover = styled.img`
  width: 100%;
  height: 15rem;
  display: block;
  margin: auto;
  object-fit: cover;

  @media (max-width: 480px) {
    height: 10rem;
  }
`;

const Image = styled.img`
  max-width: 20rem;
  margin-bottom: 0.5rem;
`;

const Title = styled.h2`
  font-weight: bold;
`;

const TagInformation = styled.p`
  margin: 0.5rem 0;
`;

const DetailWrapper = styled.div`
  max-width: 50rem;
  width: 90%;
  margin: 2rem auto;
  //   border: 1px solid orange;
  // display: flex;
  // flex-direction: column;
`;

const SpanText = styled.span`
  font-weight: bold;
  // font-size: 1rem;
`;

const AddToCollection = styled.button`
  background-color: #d61c4e;
  border: 1px solid #d61c4e;
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 7px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const AnimeDetail = () => {
  const [isModalShown, setIsModalShown] = useState(false);
  const [numAnimeCollection, setNumAnimeCollection] = useState(
    localStorage.length
  );
  const { state } = useLocation();

  const title = state.media.title.english
    ? state.media.title.english
    : state.media.title.native;
  const startDate = `${state.media.startDate.day}-${state.media.startDate.month}-${state.media.startDate.year}`;
  const endDate = `${state.media.endDate.day}-${state.media.endDate.month}-${state.media.endDate.year}`;

  useEffect(() => {}, [numAnimeCollection]);

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
    <DetailContainer>
      {isModalShown && (
        <Form
          onHide={hideModalHandler}
          onSetAnimeCollection={setAnimeCollection}
          animeCollection={numAnimeCollection}
          animeObj={state}
        />
      )}
      <Header />
      <BannerCover src={state.media.bannerImage} />

      <DetailWrapper>
        <Title>{title}</Title>

        <Image src={state.media.coverImage.large} />
        <AddToCollection onClick={showModalHandler}>
          <FavoriteBorderOutlinedIcon
            fontSize="small"
            sx={{ marginRight: "0.5rem" }}
          />
          Add to Collection
        </AddToCollection>

        <div>
          <div>
            <TagInformation>
              <SpanText>Synopsis: </SpanText>
              <br />
              {state.media.description.replace(/(<br>)+/g, "")}
            </TagInformation>

            <TagInformation>
              <SpanText>Title: </SpanText>
              {`${state.media.title.english ? state.media.title.english : ""} ${
                !state.media.title.english || !state.media.title.native
                  ? ""
                  : "/"
              } ${state.media.title.native ? state.media.title.native : ""}`}
            </TagInformation>
            <TagInformation>
              <SpanText>Genres: </SpanText>
              {`${[...state.media.genres]}`}
            </TagInformation>
            <TagInformation>
              <SpanText>Episodes: </SpanText>
              {`${state.media.episodes}`}
            </TagInformation>
            <TagInformation>
              <SpanText>Ratings: </SpanText>
              {`${state.rating}`}
            </TagInformation>
            <TagInformation>
              <SpanText>Broadcast Period: </SpanText>
              {`${startDate} to ${endDate}`}
            </TagInformation>
          </div>
        </div>
      </DetailWrapper>
    </DetailContainer>
  );
};

export default AnimeDetail;
