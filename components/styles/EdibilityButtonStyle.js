import styled from "styled-components";
import { colors, spacing, shadows, fontSize, borderRadius } from "../../styles";

export const SelectEdibilityButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing.medium};
  border-radius: ${borderRadius.button};
  background-color: ${colors.tertiary};
  font-size: ${fontSize.medium};
  border: none; // Keine Border
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  white-space: nowrap;
  width: auto;
  min-width: 0;

  &:hover {
    background-color: ${colors.tertiaryHover}; // Gleicher Hover-Effekt wie LogoutButton
    box-shadow: ${shadows.hover};
  }

  &:focus {
    outline: none;
    box-shadow: ${shadows.focus}; // Fokus-Effekt wie LogoutButton
  }

  @media (min-width: 768px) {
    padding: ${spacing.large};
    font-size: 18px;
  }
`;
