import Navbar from "../Navbar/Navbar";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  padding: 0 10px;
  color: #6e6d7a;
  border-bottom: 1px solid rgba(110, 109, 122, 0.1);
`;

const Header = () => {
  return (
    <Container>
      <h1>AnimeLists</h1>
      <Navbar />
    </Container>
  );
};

export default Header;
