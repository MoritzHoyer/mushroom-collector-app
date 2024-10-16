import React from "react";
import { useRouter } from "next/router";
import {
  EntryCardContainer,
  EntryImage,
  TextWrapper,
  EntryName,
  EntryInfo,
  IconContainer,
  IconButton,
} from "../styles/EntryCardStyle";
import Image from "next/image"; // Importiere Image für SVGs

export default function EntryCard({ entry, onMutate, onDelete }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (window.confirm("Möchtest du diesen Eintrag wirklich löschen?")) {
      const res = await fetch(`/api/entries/${entry._id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Eintrag gelöscht!");
        onMutate("/api/entries"); // Ruft die Mutate-Funktion auf, um die Einträge zu aktualisieren
      } else {
        alert("Fehler beim Löschen des Eintrags.");
      }
    }
  };

  return (
    <EntryCardContainer>
      <EntryImage src={entry.image} alt={entry.name} />
      <TextWrapper>
        <EntryName>{entry.name}</EntryName>
        <EntryInfo>Wissenschaftlicher Name: {entry.scientificName}</EntryInfo>
        <EntryInfo>
          Standort: Latitude {entry.location.latitude}, Longitude{" "}
          {entry.location.longitude}
        </EntryInfo>
        <EntryInfo>
          Datum: {new Date(entry.date).toLocaleDateString()}
        </EntryInfo>

        {/* Icons innerhalb des TextWrappers */}
        <IconContainer>
          <IconButton
            onClick={() => router.push(`/addEntry?edit=${entry._id}`)}
          >
            <Image
              src="/icons/edit-icon.svg"
              alt="Edit Entry"
              width={24}
              height={24}
            />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <Image
              src="/icons/delete-icon.svg"
              alt="Delete Entry"
              width={24}
              height={24}
            />
          </IconButton>
        </IconContainer>
      </TextWrapper>
    </EntryCardContainer>
  );
}
