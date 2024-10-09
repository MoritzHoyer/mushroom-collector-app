import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import styled from "styled-components";

const LoginButton = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    // Ladeindikator anzeigen
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
        <Button onClick={() => signOut()} aria-label="Abmelden">
          Abmelden
        </Button>
      </>
    );
  }

  return (
    <>
      <Message>Du bist nicht angemeldet</Message>
      <Button onClick={() => signIn("google")} aria-label="Mit Google anmelden">
        Mit Google anmelden
      </Button>
      <Button onClick={() => signIn("github")} aria-label="Mit GitHub anmelden">
        Mit GitHub anmelden
      </Button>
    </>
  );
};

export default LoginButton;

const Button = styled.button`
  padding: 10px 20px;
  margin: 5px;
  background-color: #5a67d8;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #434190;
  }

  &:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LoadingSpinner = styled.div`
  border: 4px solid #f3f3f3; /* Hellgrau */
  border-top: 4px solid #5a67d8; /* Blau */
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
  margin-right: 10px;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Message = styled.p`
  font-size: 16px;
  color: #4a5568; /* Dunkelgrau */
  margin: 10px 0;
`;
