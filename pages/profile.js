import { useSession } from "next-auth/react";
import { useRouter } from "next/router.js";
import { useEffect, useState } from "react";
import Footer from "../components/layout/Footer.js";
import ProfileHeader from "../components/profile/ProfileHeader.js";
import EntryList from "../components/entries/EntryList.js";
import SearchBar from "../components/profile/Searchbar.js";
import AddEntryButton from "../components/buttons/AddEntryButton.js";
import styled from "styled-components";

// Styled Component für das Layout
const ProfileContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 80px;
`;

export default function ProfilePage() {
  const { data: session } = useSession();
  const [entries, setEntries] = useState([]);
  const router = useRouter(); // Router initialisieren

  useEffect(() => {
    if (session) {
      const fetchEntries = async () => {
        const res = await fetch("/api/entries");
        if (res.ok) {
          const data = await res.json();
          setEntries(data);
        }
      };
      fetchEntries();
    }
  }, [session]);

  return (
    <ProfileContainer>
      <ProfileHeader user={session?.user} />
      <h2>Mushrooms collected ({entries.length})</h2>
      <SearchBar placeholder="Search..." />
      <EntryList entries={entries} />
      <AddEntryButton onClick={() => router.push("/addEntry")} />
      <Footer />
    </ProfileContainer>
  );
}
