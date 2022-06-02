import { useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import Header from "../Layout/Header";

const DetailContainer = styled.section`
  padding: 0.7rem auto;
  border: 1px solid black;
  height: auto;
`;

const BannerCover = styled.img`
  width: 100%;
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

const AnimeDetail = () => {
  const { state } = useLocation();
  console.log("state", state);

  const startDate = `${state.media.startDate.day}-${state.media.startDate.month}-${state.media.startDate.year}`;
  const endDate = `${state.media.endDate.day}-${state.media.endDate.month}-${state.media.endDate.year}`;

  console.log('start date', startDate);
  return (
    <DetailContainer>
        <Header />
      <BannerCover src={state.media.bannerImage} />

      <DetailWrapper>
        <Title>{state.media.title.english}</Title>

        <Image src={state.media.coverImage.large} />

        <div>
          <div>
          <TagInformation>
              <SpanText>Synopsis: </SpanText><br/>
                  {state.media.description.replace(/(<br>)+/g, '')}
            </TagInformation>

            <TagInformation>
              <SpanText>Title: </SpanText>
              {`${state.media.title.english} / ${state.media.title.native}`}
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
