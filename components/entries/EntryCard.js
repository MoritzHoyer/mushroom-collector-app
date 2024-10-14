import React from "react";
import { useRouter } from "next/router";
import {
  EntryCardContainer,
  EntryImage,
  EntryName,
  EntryInfo,
} from "../styles/EntryCardStyle";

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
      <EntryName>{entry.name}</EntryName>
      <EntryInfo>Wissenschaftlicher Name: {entry.scientificName}</EntryInfo>
      <EntryInfo>
        Standort: Latitude {entry.location.latitude}, Longitude{" "}
        {entry.location.longitude}
      </EntryInfo>
      <EntryInfo>Datum: {new Date(entry.date).toLocaleDateString()}</EntryInfo>

      {/* Bearbeiten Button */}
      <button onClick={() => router.push(`/addEntry?edit=${entry._id}`)}>
        Bearbeiten
      </button>

      {/* Löschen Button */}
      <button onClick={handleDelete}>Löschen</button>
    </EntryCardContainer>
  );
}
