import React from "react";
import Image from "next/image";
import {
  HeaderContainer,
  ProfilePicture,
  Username,
  SettingsButton,
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
      <SettingsButton onClick={() => console.log("Settings Clicked")}>
        <Image
          src="/icons/settings-icon.svg"
          alt="Settings Icon"
          width={24}
          height={24}
        />
      </SettingsButton>
    </HeaderContainer>
  );
}
