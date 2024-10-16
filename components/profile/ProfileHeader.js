import React from "react";
import {
  HeaderContainer,
  ProfilePicture,
  Username,
} from "../styles/ProfileHeaderStyle";

export default function ProfileHeader({ user }) {
  return (
    <HeaderContainer>
      {user ? ( // Überprüfen, ob der Benutzer vorhanden ist
        <>
          <ProfilePicture src={user.image} alt="Profile Picture" />
          <Username>{user.name || "User"}</Username>
        </>
      ) : (
        <Username>Loading...</Username> // Fallback, wenn Benutzer nicht vorhanden ist
      )}
    </HeaderContainer>
  );
}
