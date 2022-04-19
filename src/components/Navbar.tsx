import React from "react";
import styled from "styled-components";
import { ExtendedProps } from "../typings";

const StyledNav = styled.nav`
  position: fixed;
  width: 100%;
  top: 0;
  background-color: #FFFFFF;
  z-index: 9999;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  border-bottom: 1px solid #f9f9f6;
  box-shadow: 0 5px 10px -3px rgba(0, 0, 0, 0.1), 0 2px 3px -2px rgba(0, 0, 0, 0.05);
`;

const StyledLogo = styled.div`
  display: flex;
  width: 150px;
  padding: 5px;
  height: 90px;
  align-items: center;
  justify-content: center;
  a {
    width: 100%;
  }
`;

const StyledNavLinks = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`;

export

const NavBar = ({ children }: ExtendedProps ) => {

  return (
    <StyledNav data-testid="nav-bar">
      <StyledLogo>
        <p>AccuRx Dashboard</p>
      </StyledLogo>
      <StyledNavLinks>{ children }</StyledNavLinks>
    </StyledNav>
  );
};

export default NavBar;
