import { Fragment } from "react";
import Anime from "./components/Anime/Anime";
import Header from "./components/Layout/Header";
import styled from "@emotion/styled";

const Container = styled.div`
  max-width: 70rem;
  width: 90%;
  margin: 2rem auto;
  padding-bottom: 4rem;
`;

function App() {
  return (
    <Container>
      <Header />
      <Anime />
    </Container>
  );
}

export default App;
