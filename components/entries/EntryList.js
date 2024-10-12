import React from "react";
import EntryCard from "./EntryCard";
import styled from "styled-components";

const ListContainer = styled.div`
  width: 100%;
`;

const EntryList = ({ entries }) => {
  if (!entries || entries.length === 0) {
    return <p>Keine Einträge gefunden.</p>;
  }

  return (
    <ListContainer>
      {entries.map((entry) => (
        <EntryCard key={entry._id} entry={entry} />
      ))}
    </ListContainer>
  );
};

export default EntryList;
