import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import ProfileHeader from "@/components/profile/ProfileHeader";
import EntryList from "@/components/entries/EntryList";
import SearchBar from "@/components/searchbar/Searchbar";
import AddEntryButton from "@/components/buttons/AddEntryButton";
import { Container } from "@/styles";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ProfilePage() {
  const { data: session, status } = useSession();
  console.log("session", session);
  const router = useRouter();

  // Fetch entries using useSWR for caching
  const { data: entries, error } = useSWR(
    session ? "/api/entries" : null,
    fetcher
  );

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/");
    }
  }, [session, status]);

  if (status === "loading" || !entries) {
    return <p>Lade Authentifizierungsstatus...</p>;
  }

  return (
    <Container>
      <ProfileHeader user={session?.user} />
      <h1>Gesammelte Pilze ({entries.length})</h1>
      <SearchBar placeholder="Suchen..." />
      <EntryList entries={entries} />
      <AddEntryButton onClick={() => router.push("/addEntry")} />
    </Container>
  );
}
