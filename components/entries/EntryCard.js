import React from "react";
import Link from "next/link";
import {
  EntryCardContainer,
  EntryImage,
  EntryName,
  EntryInfo,
} from "../styles/EntryCardStyle";

export default function EntryCard({ entry }) {
  return (
    <Link href={`/entries/${entry._id}`} passHref>
      <EntryCardContainer>
        <EntryImage src={entry.images[0]} alt={entry.name} />
        <EntryName>{entry.name}</EntryName>
        <EntryInfo>Wissenschaftlicher Name: {entry.scientificName}</EntryInfo>
        <EntryInfo>
          Standort: Latitude {entry.location.latitude}, Longitude{" "}
          {entry.location.longitude}
        </EntryInfo>
        <EntryInfo>
          Datum: {new Date(entry.date).toLocaleDateString()}
        </EntryInfo>
      </EntryCardContainer>
    </Link>
  );
}
