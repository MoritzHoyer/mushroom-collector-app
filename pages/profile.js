// pages/profile.js
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import ProfileHeader from "../components/profile/ProfileHeader";
import EntryList from "../components/entries/EntryList";
import SearchBar from "../components/searchbar/Searchbar";
import AddEntryButton from "../components/buttons/AddEntryButton";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [entries, setEntries] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/");
      return;
    }

    const fetchEntries = async () => {
      const res = await fetch("/api/entries");
      if (res.ok) {
        const data = await res.json();
        setEntries(data);
      } else {
        console.error("Fehler beim Laden der Einträge");
      }
    };
    fetchEntries();
  }, [session, status]);

  if (status === "loading") {
    return <p>Lade Authentifizierungsstatus...</p>;
  }

  return (
    <MainLayout>
      <ProfileHeader user={session?.user} />
      <h2>Gesammelte Pilze ({entries.length})</h2>
      <SearchBar placeholder="Suchen..." />
      <EntryList entries={entries} />
      <AddEntryButton onClick={() => router.push("/addEntry")} />
    </MainLayout>
  );
}
