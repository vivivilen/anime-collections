import { Fragment } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const NavbarWrapper = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const NavbarItem = styled.li`
  list-style: none;
  padding: 4px 8px;
  font-size: 1rem;
  color: black;
`;

const Navbar = () => {
  return (
    <Fragment>
      <NavbarWrapper>
        <Link to="/">
          <NavbarItem key="home">Home</NavbarItem>
        </Link>
        <Link to="/collections">
          <NavbarItem key="collections">Collections</NavbarItem>
        </Link>
      </NavbarWrapper>
    </Fragment>
  );
};

export default Navbar;
