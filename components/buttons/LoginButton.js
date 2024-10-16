// components/buttons/LoginButton.js
import React from "react";
import { useSession } from "next-auth/react";
import {
  LoadingContainer,
  LoadingSpinner,
  Message,
} from "../styles/LoginButtonStyle";
import GoogleLoginButton from "./GoogleLoginButton";
import GitHubLoginButton from "./GitHubLoginButton";

const LoginButton = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <LoadingContainer>
        <LoadingSpinner />
        <Message>Lade Authentifizierungsstatus...</Message>
      </LoadingContainer>
    );
  }

  if (!session) {
    return (
      <>
        <Message>Du bist nicht angemeldet</Message>
        <GoogleLoginButton />
        <GitHubLoginButton />
      </>
    );
  }

  return null; // Wenn der Benutzer angemeldet ist, wird kein Button angezeigt
};

export default LoginButton;
