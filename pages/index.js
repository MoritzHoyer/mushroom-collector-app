import Header from "@/components/layout/Header";
import LoginButton from "@/components/buttons/LoginButton";
import SearchBar from "@/components/searchbar/Searchbar";
import { Container } from "@/styles";

export default function HomePage() {
  return (
    <Container>
      <Header />
      <h1>Pilze bestimmen</h1>
      <LoginButton />
      <SearchBar placeholder="Suchen..." />
    </Container>
  );
}
