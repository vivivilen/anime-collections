import { Fragment, useEffect } from "react";
import Anime from "./components/Anime/Anime";
import Header from "./components/Layout/Header";

function App() {
  return (
    <Fragment>
      <Header />
      <Anime />
    </Fragment>
  );
}

export default App;
