import styled from "@emotion/styled";
import Card from "../UI/Card";

const ListCollectionItemWrapper = styled.div`
  margin: 2rem auto;
`;

const Title = styled.p`
  margin: 0.5rem 0.8rem;
`;

const Image = styled.img`
  width: 100%;
`;

const ListCollectionItem = () => {
    return (
        <ListCollectionItemWrapper>
            <Card>
                <Image></Image>
                <Title></Title>
            </Card>
        </ListCollectionItemWrapper>
    )

}

export default ListCollectionItem;