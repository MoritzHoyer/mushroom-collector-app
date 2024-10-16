import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import ProfileHeader from "@/components/profile/ProfileHeader";
import EntryList from "@/components/entries/EntryList";
import AddEntryButton from "@/components/buttons/AddEntryButton";
import { Container } from "@/styles";

// SWR fetcher function to get the entries
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Fetch entries using useSWR for caching and automatic revalidation
  const {
    data: entries = [],
    error,
    mutate,
  } = useSWR(session ? "/api/entries" : null, fetcher);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/login");
    }
  }, [session, status]);

  if (status === "loading" || !entries) {
    return <p>Lade Authentifizierungsstatus...</p>;
  }

  // Handler to delete an entry
  const handleDelete = async (entryId) => {
    if (window.confirm("Möchtest du diesen Eintrag wirklich löschen?")) {
      const res = await fetch(`/api/entries/${entryId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Eintrag gelöscht!");
        await mutate("/api/entries"); // Use mutate to refresh entries after delete
      } else {
        alert("Fehler beim Löschen des Eintrags.");
      }
    }
  };

  return (
    <Container>
      <ProfileHeader user={session?.user} />
      <h1>Gesammelte Pilze ({entries.length})</h1>
      {/* Pass the onDelete handler and mutate function to EntryList */}
      <EntryList entries={entries} onDelete={handleDelete} onMutate={mutate} />
      <AddEntryButton onClick={() => router.push("/addEntry")} />
    </Container>
  );
}
