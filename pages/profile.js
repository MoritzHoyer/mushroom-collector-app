// pages/profile.js
import { useSession } from "next-auth/react";
import Header from "../components/Header/Header.js";
import Footer from "../components/Footer/Footer.js";
import ProfileHeader from "../components/ProfileHeader/ProfileHeader.js";
import EntryList from "../components/EntryList/EntryList.js";
import SearchBar from "../components/Searchbar/Searchbar.js";
import AddEntryButton from "../components/AddEntryButton/AddEntryButton.js";
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

  // Dummy-Daten für die gesammelten Pilze (zum Testen)
  const dummyEntries = [
    {
      id: 1,
      name: "Fly agaric",
      species: "Amanita muscaria",
      location: "Binjiang, Hangzhou, Zhejiang",
      date: "Jun 11, 2024",
      image: "/path/to/fly-agaric-image.jpg",
    },
    {
      id: 2,
      name: "King bolete",
      species: "Boletus edulis",
      location: "Binjiang, Hangzhou, Zhejiang",
      date: "Aug 03, 2023",
      image: "/path/to/king-bolete-image.jpg",
    },
  ];

  return (
    <ProfileContainer>
      <ProfileHeader user={session?.user} />
      <h2>Mushrooms collected ({dummyEntries.length})</h2>
      <SearchBar placeholder="Search..." />
      <EntryList entries={dummyEntries} />
      <AddEntryButton onClick={() => console.log("Add Entry Clicked")} />
      <Footer />
    </ProfileContainer>
  );
}
