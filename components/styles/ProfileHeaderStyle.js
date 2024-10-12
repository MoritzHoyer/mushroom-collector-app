import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

export const ProfilePicture = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;

export const Username = styled.h1`
  margin-left: ${({ theme }) => theme.spacing.small};
`;

export const SettingsButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;
