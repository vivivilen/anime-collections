import styled from "@emotion/styled";
import Card from "../UI/Card";
import { useNavigate } from "react-router-dom";

const AnimeItemWrapper = styled.div`
  margin: 2rem auto;
`;

const Title = styled.p`
  margin: 0.5rem 0.8rem;
`;

const Image = styled.img`
  width: 100%;
`;

const AnimeItem = (props) => {
  const { media } = props.animeData;
   console.log('props: ', props.animeData);

  let navigate = useNavigate();

  return (
    <AnimeItemWrapper
      onClick={() => {
        console.log(media.title.english);
        navigate('/anime-detail', { state: props.animeData});
      }}
    >
      <Card>
        <Image src={media.coverImage.large} alt={media.title.english} />
        <Title>{media.title.english}</Title>
      </Card>
    </AnimeItemWrapper>
  );
};

export default AnimeItem;
