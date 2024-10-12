import Footer from "./Footer";
import { AppContainer, Content } from "../styles/MainLayoutStyle";
import { Container } from "../styles/GlobalStyles";

export default function MainLayout({ children }) {
  return (
    <AppContainer>
      <Container>
        <Content>{children}</Content>
      </Container>
      <Footer />
    </AppContainer>
  );
}
