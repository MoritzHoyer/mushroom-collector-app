import { GlobalStyle, Container } from "@/styles";
import { SessionProvider } from "next-auth/react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { useRouter } from "next/router";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();
  const isLoginPage = router.pathname === "/login";

  return (
    <>
      <GlobalStyle />
      <SessionProvider session={session}>
        {!isLoginPage && <Header />}
        <Container style={{ flex: 1 }}>
          <Component {...pageProps} />
        </Container>
        {!isLoginPage && <Footer />}
      </SessionProvider>
    </>
  );
}
