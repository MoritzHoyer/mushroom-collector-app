import React from "react";
import styled from "styled-components";
import Image from "next/image";

const SearchBarContainer = styled.div`
  position: relative; // Position relativ für das Positionieren des Icons
  width: 100%;
`;

const StyledSearchBar = styled.input`
  width: 100%;
  padding: 10px 40px 10px 10px; // Platz für das Icon auf der rechten Seite
  margin: 20px 0;
  border: 1px solid #ccc;
  border-radius: 25px; // Abgerundete Ecken
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 10px; // Abstand von der rechten Seite
  top: 50%; // Vertikale Zentrierung
  transform: translateY(-50%); // Vertikal zentrieren
  pointer-events: none; // Klickevents an das Input-Feld weitergeben
`;

export default function SearchBar({ placeholder }) {
  return (
    <SearchBarContainer>
      <StyledSearchBar type="text" placeholder={placeholder} />
      <SearchIcon>
        <Image
          src="/icons/search-icon.svg"
          alt="Search Icon"
          width={20}
          height={20}
        />
      </SearchIcon>
    </SearchBarContainer>
  );
}
