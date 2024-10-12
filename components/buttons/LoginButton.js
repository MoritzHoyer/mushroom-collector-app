import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { PrimaryButton } from "../styles/PrimaryButtonStyle";
import {
  LoadingContainer,
  LoadingSpinner,
  Message,
} from "../styles/LoginButtonStyle";

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

  if (session) {
    return (
      <>
        <Message>Angemeldet als {session.user.email}</Message>
        <PrimaryButton onClick={() => signOut()} aria-label="Abmelden">
          Abmelden
        </PrimaryButton>
      </>
    );
  }

  return (
    <>
      <Message>Du bist nicht angemeldet</Message>
      <PrimaryButton
        onClick={() => signIn("google")}
        aria-label="Mit Google anmelden"
      >
        Mit Google anmelden
      </PrimaryButton>
      <PrimaryButton
        onClick={() => signIn("github")}
        aria-label="Mit GitHub anmelden"
      >
        Mit GitHub anmelden
      </PrimaryButton>
    </>
  );
};

export default LoginButton;
