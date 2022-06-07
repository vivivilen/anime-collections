import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import AnimeItem from "../Anime/AnimeItem";
import { useLocation } from "react-router-dom";
import Header from "../Layout/Header";

const Container = styled.div`
  max-width: 70rem;
  width: 90%;
  margin: 2rem auto;
  padding-bottom: 4rem;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 2.5rem;
  // border: 1px solid black;
  padding: 1.5rem 0.5rem;
`;

const CollectionListWrapper = styled(Container)`
  display: flex;
  flex-wrap: wrap;
`;

const InfoText = styled.h1`
  margin: auto;
  color: #bebebe;
  text-align: center;
`

const CollectionDetail = () => {
  const [collectionDetailData, setCollectionDetailData] = useState([]);
  const [isModalShown, setIsModalShown] = useState(false);
  const { state } = useLocation();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(state));
    setCollectionDetailData(data);
  }, []);

  const hideModalHandler = () => {
    setIsModalShown(false);
  };

  const removeAnimeFromCollection = (id) => {
    const updatedData = collectionDetailData.filter((data) => data.id !== id);
    setCollectionDetailData(updatedData);
    localStorage.setItem(state, JSON.stringify(updatedData));
    hideModalHandler();
  };

  return (
    <Container>
      <Header />
      <Title>{state}</Title>
      <CollectionListWrapper>
        {collectionDetailData.length <= 0 && <InfoText>No Anime added to this collection</InfoText>}
        {collectionDetailData.map((data, index) => {
          return (
            <AnimeItem
              key={index}
              animeData={data}
              hasDeleteIcon={true}
              onRemoveAnime={removeAnimeFromCollection}
            />
          );
        })}
      </CollectionListWrapper>
    </Container>
  );
};
export default CollectionDetail;
