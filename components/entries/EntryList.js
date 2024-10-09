import React from "react";
import EntryCard from "./EntryCard.js";
import styled from "styled-components";

const ListContainer = styled.div`
  width: 100%;
`;

export default function EntryList({ entries }) {
  console.log("entries", entries);
  return (
    <ListContainer>
      {entries.map((entry) => (
        <EntryCard key={entry._id} entry={entry} />
      ))}
    </ListContainer>
  );
}
