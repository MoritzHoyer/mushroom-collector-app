import React from "react";
import EntryCard from "../EntryCard/EntryCard.js";
import styled from "styled-components";

const ListContainer = styled.div`
  width: 100%;
`;

export default function EntryList({ entries }) {
  return (
    <ListContainer>
      {entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </ListContainer>
  );
}
