import Header from "../components/layout/Header";
import LoginButton from "@/components/buttons/LoginButton";
import SearchBar from "../components/searchbar/Searchbar";
import { PageTitle } from "../components/styles/GlobalStyles";
import MainLayout from "@/components/layout/MainLayout";

export default function HomePage() {
  return (
    <MainLayout>
      <Header />
      <PageTitle>Pilze bestimmen</PageTitle>
      <LoginButton />
      <SearchBar placeholder="Suchen..." />
      {/* Weitere Inhalte der Homepage */}
    </MainLayout>
  );
}
