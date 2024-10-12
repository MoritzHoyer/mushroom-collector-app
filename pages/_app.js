import { ThemeProvider } from "styled-components";
import GlobalStyle from "../styles";
import { SessionProvider } from "next-auth/react";
import { theme } from "../components/styles/theme.js";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  console.log("Theme in _app.js:", theme); // Theme hier ebenfalls prüfen

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </ThemeProvider>
    </>
  );
}
