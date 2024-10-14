import React from "react";
import Link from "next/link";
import {
  FooterContainer,
  Nav,
  NavLink,
  IconImage,
} from "../styles/FooterStyle";

export default function Footer() {
  return (
    <FooterContainer>
      <Nav>
        <Link href="/" passHref>
          <NavLink>
            <IconImage src="/icons/knowledge-icon.svg" alt="Knowledge Icon" />
            Identify
          </NavLink>
        </Link>
        <Link href="/locations" passHref>
          <NavLink>
            <IconImage src="/icons/map-icon.svg" alt="Map Icon" />
            Locations
          </NavLink>
        </Link>
        <Link href="/addEntry" passHref>
          <NavLink>
            <IconImage src="/icons/addEntry-icon.svg" alt="Add Entry Icon" />
            Add Entry
          </NavLink>
        </Link>
        <Link href="/profile" passHref>
          <NavLink>
            <IconImage src="/icons/profile-icon.svg" alt="Profile Icon" />
            Profile
          </NavLink>
        </Link>
      </Nav>
    </FooterContainer>
  );
}
