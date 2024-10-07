import React from "react";
import styled from "styled-components";
import Image from "next/image";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const ProfilePicture = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;

const Username = styled.h1`
  margin-left: 10px;
`;

const SettingsButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

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
