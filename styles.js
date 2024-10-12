import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-family: ${({ theme }) => theme.fontFamily.regular};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }

  body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding: ${({ theme }) => theme.spacing.medium};
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-family: ${({ theme }) =>
      theme.fontFamily.bold}; /* Verwende die fette Schriftart */
    font-weight: 700;
  }
`;
