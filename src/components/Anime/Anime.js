import { useState, useEffect } from "react";
import AnimeItem from "./AnimeItem";
import "antd/dist/antd.min.css";
import styled from "@emotion/styled";
import axios from "axios";
import { Pagination } from "antd";

const Container = styled.div`
  max-width: 70rem;
  width: 90%;
  margin: 2rem auto;
  padding-bottom: 4rem;
`;

const AnimeListWrapper = styled(Container)`
  display: flex;
  flex-wrap: wrap;
`;

const Anime = () => {
  const [animeList, setAnimeList] = useState([]);
  const [pageInfo, setPageInfo] = useState(null);
  const [pageNum, setPageNum] = useState(1);

  const fetchAnimeList = async () => {
    await axios
      .post("https://graphql.anilist.co", {
        query: `query{Page(page:${pageNum}, perPage:10){
              pageInfo{
                total
                perPage
                currentPage
                lastPage
                hasNextPage
              }
              recommendations {
                id
                rating
                media{
                    id
                    title {
                      english
                      native
                    }
                    description
                    episodes
                    type
                    bannerImage
                    coverImage {
                      extraLarge
                      large
                      medium
                      color
                    }
                    startDate {
                      year
                      month
                      day
                    }
                    endDate {
                      year
                      month
                      day
                    }
                    type
                    genres
                  }
              }
            }}`,
      })
      .then(({ data }) => {
        console.log("data: ", data);
        setPageInfo(data.data.Page.pageInfo);
        setAnimeList(data.data.Page.recommendations);
      });
  };

  useEffect(() => {
    fetchAnimeList();
  }, [pageNum]);

  const onChange = (pageNumber) => {
    console.log("page Num: ", pageNumber);
    setPageNum(pageNumber);
  };

  console.log("page info:", pageInfo);
  console.log("anime:", animeList);

  return (
    <Container>
      <AnimeListWrapper>
        {animeList.map((list) => (
          <AnimeItem
            key={list.id}
            animeData={list}
          />
        ))}
      </AnimeListWrapper>
      <Pagination
        onChange={onChange}
        current={pageInfo?.currentPage}
        total={pageInfo?.total}
        pageSize={10}
      />
    </Container>
  );
};

export default Anime;
