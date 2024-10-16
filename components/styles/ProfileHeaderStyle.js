import styled from "styled-components";
import { spacing, shadows } from "../../styles";

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

  @media (min-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

export const Username = styled.h1`
  margin-left: ${spacing.small};

  @media (min-width: 768px) {
    font-size: 24px;
  }
`;
