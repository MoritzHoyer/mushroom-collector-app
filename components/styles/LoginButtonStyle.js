import styled from "styled-components";
import { colors, fontSize, spacing, borderRadius, shadows } from "../../styles";

const BaseButton = styled.button`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: ${spacing.medium} ${spacing.large};
  margin: ${spacing.small} 0;
  border-radius: ${borderRadius.button};
  background-color: ${colors.background || "#FBF8F6"};
  border: 2px solid ${colors.border || "#958B71"};
  color: ${colors.text || "#303133"}
  font-size: ${fontSize.medium};
  font-weight: bold;
  cursor: pointer;
  box-shadow: ${shadows.normal};
  position: relative; // Ermöglicht die absolute Positionierung des Textes

  &:hover {
    background-color: ${colors.backgroundHover || "#f0f0f0"};
    box-shadow: ${shadows.hover};
  }

  &:focus {
    outline: none;
    box-shadow: ${shadows.focus};
  }

  &:disabled {
    background-color: ${colors.disabled};
    cursor: not-allowed;
  }

  img {
    width: 24px;
    height: 24px;
    margin-right: ${spacing.medium};
  }

  span {
    position: absolute;
    left: 0;
    right: 0;
    text-align: center; // Text wird zentriert
  }

  @media (min-width: 768px) {
    padding: ${spacing.large};
    font-size: ${fontSize.large};
  }
`;

export const GoogleButton = styled(BaseButton)`
  border-color: ${colors.googleBorder || "#dcdcdc"};
`;

export const GitHubButton = styled(BaseButton)`
  border-color: ${colors.githubBorder || "#dcdcdc"};
`;
