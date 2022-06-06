import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import CollectionItem from "./CollectionItem";
import Form from "./Form";
import Header from "../Layout/Header";

const Container = styled.div`
  max-width: 70rem;
  width: 90%;
  margin: 2rem auto;
  padding-bottom: 4rem;
`;

const CollectionWrapper = styled(Container)`
  display: flex;
  flex-wrap: wrap;
  // border: 2px solid black;
`;

const AddaCollection = styled.button`
  background-color: #d61c4e;
  border: 1px solid #d61c4e;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 7px;
  font-size: 1.2rem;
  display: block;
  margin: 1.5rem auto;
  cursor: pointer;
`;

const InfoText = styled.h1`
  margin: auto;
`

const Collection = () => {
  const [isModalShown, setIsModalShown] = useState(false);
  let value = new Map();
  const [collectionName, setCollectionName] = useState([]);
  const [numAnimeCollection, setNumAnimeCollection] = useState(
    localStorage.length
  );

  const fetchData = () => {
    let updatedData = [];
    for (let i = 0; i < localStorage.length; i++) {
      let name = localStorage.key(i);
      value.set(name, JSON.parse(localStorage.getItem(name)));
      updatedData.push(name);
    }
    setCollectionName(updatedData);
  };

  useEffect(() => {
    if(numAnimeCollection <= 0) {
      return;
    }
    fetchData();

  }, [numAnimeCollection]);

  const setAnimeCollection = (data) => {
    setNumAnimeCollection(data);
  };

  const showModalHandler = () => {
    setIsModalShown(true);
  };

  const hideModalHandler = () => {
    setIsModalShown(false);
  };

  const removeCollection = (id) => {
    const updatedCollection = collectionName.filter((col) => col !== id);
    localStorage.removeItem(id);
    setCollectionName(updatedCollection);
    setAnimeCollection(localStorage.length);
  };

  return (
    <Container>
      <Header />
      {isModalShown && (
        <Form
          params="addCollection"
          onHide={hideModalHandler}
          animeCollection={numAnimeCollection}
          onSetAnimeCollection={setAnimeCollection}
        />
      )}
      <AddaCollection onClick={showModalHandler}>
        Add a Collection
      </AddaCollection>
      <CollectionWrapper>
      {numAnimeCollection <= 0 && <InfoText>No Collection yet</InfoText>}
        {collectionName.map((val, index) => (
          <CollectionItem
            key={index}
            collectionName={val}
            onRemoveCollection={removeCollection}
          />
        ))}
      </CollectionWrapper>
    </Container>
  );
};

export default Collection;
