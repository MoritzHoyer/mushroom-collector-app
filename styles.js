import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

export const GlobalStyle = createGlobalStyle`
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
    font-family: 'Bricolage Grotesque', sans-serif;
    background-color: #FBF8F6;
    color: #303133;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-weight: 700;
    font-size: 24px;
  }

  p {
    font-size: 16px;
  }

  @media (min-width: 768px) {
    body {
      padding-left: 20px;
      padding-right: 20px;
    }

    h1 {
      font-size: 30px;
    }

    p {
      font-size: 18px;
    }
  }

  @media (min-width: 1024px) {
    body {
      padding-left: 30px;
      padding-right: 30px;
    }

    h1 {
      font-size: 36px;
    }

    p {
      font-size: 20px;
    }
  }
`;

export const colors = {
  primary: "#A94B2B",
  secondary: "#F1E9DC",
  tertiary: "#C0BBAF",
  primaryHover: "##803824",
  tertiaryHover: "#958B71",
  boletes: "#E9C7DD",
  lamellaAnnulus: "#EFB857",
  lamella: "#C1C761",
  otherMushrooms: "#94BFE1",
  disabled: "#a0aec0",
  text: "#303133",
  background: "#FBF8F6",
  backgroundHover: "#f0f0f0",
  error: "#e53e3e",
  success: "#48bb78",
  border: "#C0BBAF",
};

export const spacing = {
  small: "5px",
  medium: "10px",
  large: "15px",
  extralarge: "30px",
  footerPadding: "30px",
};

export const borderRadius = {
  button: "50px",
  input: "6px",
};

export const fontSize = {
  small: "12px",
  medium: "16px",
  large: "24px",
};

export const iconSize = {
  small: "16px",
  medium: "20px",
  large: "24px",
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px ${spacing.large} 50px ${spacing.large};
  flex: 1;
`;

export const shadows = {
  focus: "0 0 5px rgba(169, 75, 43, 0.5)",
  hover: "0 4px 6px rgba(48, 49, 51, 0.1)",
  cardHover: "0 4px 12px rgba(48, 49, 51, 0.15)",
};

export const ErrorMessage = styled.p`
  color: ${colors.error};
  font-size: 14px;
  margin-top: 8px;
`;

export const SuccessMessage = styled.p`
  color: ${colors.success};
  font-size: 14px;
  margin-top: 8px;
`;

export const Input = styled.input`
  border: 1px solid ${({ $isError }) => ($isError ? colors.error : "#ccc")};
  padding: 10px;
  border-radius: 6px;
  width: 100%;
  margin-bottom: 10px;
`;
