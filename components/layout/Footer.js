import React, { useState } from "react";
import Link from "next/link";
import {
  FooterContainer,
  Nav,
  NavLink,
  IconImage,
} from "../styles/FooterStyle";
import { useSession } from "next-auth/react";

const Footer = () => {
  const { data: session } = useSession();

  const [hoveredLink, setHoveredLink] = useState(null);

  if (!session) return null;

  return (
    <FooterContainer>
      <Nav>
        <Link href="/identify" passHref>
          <NavLink
            onMouseEnter={() => setHoveredLink("identify")}
            onMouseLeave={() => setHoveredLink(null)}
            $isActive={hoveredLink === "identify"}
          >
            <IconImage
              src={
                hoveredLink === "identify"
                  ? "/icons/identify-icon-02.svg"
                  : "/icons/identify-icon-01.svg"
              }
              alt="Identify Icon"
            />
            Identify
          </NavLink>
        </Link>
        <Link href="/locations" passHref>
          <NavLink
            onMouseEnter={() => setHoveredLink("locations")}
            onMouseLeave={() => setHoveredLink(null)}
            $isActive={hoveredLink === "locations"}
          >
            <IconImage
              src={
                hoveredLink === "locations"
                  ? "/icons/map-icon-02.svg"
                  : "/icons/map-icon-01.svg"
              }
              alt="Map Icon"
            />
            Locations
          </NavLink>
        </Link>
        <Link href="/addEntry" passHref>
          <NavLink
            onMouseEnter={() => setHoveredLink("addEntry")}
            onMouseLeave={() => setHoveredLink(null)}
            $isActive={hoveredLink === "addEntry"}
          >
            <IconImage
              src={
                hoveredLink === "addEntry"
                  ? "/icons/addEntry-icon-02.svg"
                  : "/icons/addEntry-icon-01.svg"
              }
              alt="Add Entry Icon"
            />
            Add Entry
          </NavLink>
        </Link>
        <Link href="/profile" passHref>
          <NavLink
            onMouseEnter={() => setHoveredLink("profile")}
            onMouseLeave={() => setHoveredLink(null)}
            $isActive={hoveredLink === "profile"}
          >
            <IconImage
              src={
                hoveredLink === "profile"
                  ? "/icons/profile-icon-02.svg"
                  : "/icons/profile-icon-01.svg"
              }
              alt="Profile Icon"
            />
            Profile
          </NavLink>
        </Link>
      </Nav>
    </FooterContainer>
  );
};

export default Footer;
