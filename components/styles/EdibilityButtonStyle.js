import styled from "styled-components";
import { colors, spacing, shadows, fontSize, borderRadius } from "../../styles";

export const SelectEdibilityButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing.medium};
  border-radius: ${borderRadius.button};
  background-color: ${(props) =>
    props.$isSelected
      ? colors.primary
      : colors.tertiary}; // Primärfarbe für ausgewählt
  font-size: ${fontSize.medium};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  white-space: nowrap;
  width: auto;
  min-width: 0;

  &:hover {
    background-color: ${colors.tertiaryHover}; // Hover-Effekt
    box-shadow: ${shadows.hover};
  }

  &:focus {
    outline: none;
    box-shadow: ${shadows.focus}; // Fokus-Effekt
  }

  @media (min-width: 768px) {
    padding: ${spacing.large};
    font-size: 18px;
  }
`;
