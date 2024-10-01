import React from "react";
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";

const FooterContainer = styled.footer`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 10px 0;
  text-align: center;
  background-color: #ffffff;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-around;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 15px;

  @media (max-width: 480px) {
    gap: 5px;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #000000;
  font-weight: normal;

  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;

  font-size: 12px;
  line-height: 1.2;

  &:hover {
    text-decoration: underline; // Unterstreichung beim Hover
  }
`;

const Icon = styled(Image)`
  margin-bottom: 5px;
`;

export default function Footer() {
  return (
    <FooterContainer>
      <Nav>
        <NavLink href="/">
          <Icon
            src="/icons/home-icon.svg"
            alt="Home Icon"
            width={24}
            height={24}
          />
          Home
        </NavLink>
        <NavLink href="/map">
          <Icon
            src="/icons/map-icon.svg"
            alt="Map Icon"
            width={24}
            height={24}
          />
          Map
        </NavLink>
        <NavLink href="/add-entry">
          <Icon
            src="/icons/add-entry-icon.svg"
            alt="Add Entry Icon"
            width={24}
            height={24}
          />
          Add Entry
        </NavLink>
        <NavLink href="/recipes">
          <Icon
            src="/icons/recipes-icon.svg"
            alt="Recipes Icon"
            width={24}
            height={24}
          />
          Recipes
        </NavLink>
        <NavLink href="/profile">
          <Icon
            src="/icons/profile-icon.svg"
            alt="Profile Icon"
            width={24}
            height={24}
          />
          Profile
        </NavLink>
      </Nav>
    </FooterContainer>
  );
}
