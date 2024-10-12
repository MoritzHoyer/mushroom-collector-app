import React from "react";
import { FooterContainer, Nav, NavLink, Icon } from "../styles/FooterStyle";
import { IconImage } from "../styles/SelectButtonStyle";

export default function Footer() {
  return (
    <FooterContainer>
      <Nav>
        <NavLink href="/">
          <IconImage
            src="/icons/knowledge-icon.svg"
            alt="Knowledge Icon"
            width={24}
            height={24}
          />
          Identification
        </NavLink>
        <NavLink href="/map">
          <IconImage
            src="/icons/map-icon.svg"
            alt="Map Icon"
            width={24}
            height={24}
          />
          Locations
        </NavLink>
        <NavLink href="/addEntry">
          <IconImage
            src="/icons/addEntry-icon.svg"
            alt="Add Entry Icon"
            width={24}
            height={24}
          />
          Add Entry
        </NavLink>
        <NavLink href="/profile">
          <IconImage
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
