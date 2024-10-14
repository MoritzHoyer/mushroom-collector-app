import { GlobalStyle, Container } from "@/styles";
import { SessionProvider } from "next-auth/react";
import Footer from "@/components/layout/Footer";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <GlobalStyle />
      <SessionProvider session={session}>
        <Container style={{ flex: 1 }}>
          <Component {...pageProps} />
        </Container>
        <Footer />
      </SessionProvider>
    </>
  );
}
