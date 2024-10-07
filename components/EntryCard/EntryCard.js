import React from "react";
import styled from "styled-components";
import Link from "next/link";

const EntryCardContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 15px;
  margin: 10px 0;
  text-decoration: none;
  color: black;
  width: 100%; // Setze die Breite auf 100%

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
  }
`;

const EntryImage = styled.img`
  border-radius: 10px;
  width: 100%;
  height: auto;
`;

const EntryName = styled.h3`
  margin: 10px 0 5px;
`;

const EntrySpecies = styled.p`
  margin: 5px 0;
`;

const EntryLocation = styled.p`
  margin: 5px 0;
`;

const EntryDate = styled.p`
  margin: 5px 0;
`;

export default function EntryCard({ entry }) {
  return (
    <EntryCardContainer href={`/entries/${entry.id}`}>
      <EntryImage src={entry.image} alt={entry.name} />
      <EntryName>{entry.name}</EntryName>
      <EntrySpecies>{entry.species}</EntrySpecies>
      <EntryLocation>{entry.location}</EntryLocation>
      <EntryDate>{entry.date}</EntryDate>
    </EntryCardContainer>
  );
}
