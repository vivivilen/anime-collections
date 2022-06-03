import styled from "@emotion/styled";

const Container = styled.div`
  max-width: 70rem;
  width: 90%;
  margin: 2rem auto;
  padding-bottom: 4rem;
`;

const CollectionListWrapper = styled(Container)`
  display: flex;
  flex-wrap: wrap;
`;

const ListCollection = () => {
    return (
        <Container>
            <CollectionListWrapper>
            </CollectionListWrapper>
        </Container>
    )
}

export default ListCollection;