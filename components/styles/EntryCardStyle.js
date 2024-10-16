import styled from "styled-components";
import { colors, spacing, borderRadius, shadows } from "../../styles";

// Container für die gesamte Karte
export const EntryCardContainer = styled.div`
  width: 100%;
  border-radius: 28px;
  background-color: ${colors.secondary}; // Verwende die beige Hintergrundfarbe
  box-shadow: ${shadows.cardHover};
  overflow: hidden;
  border: 1px solid ${colors.border};
  margin-bottom: ${spacing.large}; // Abstand zwischen den Karten
`;

// Container für das Bild (oben)
export const EntryImage = styled.div`
  width: 100%;
  height: 200px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
`;

// Container für den Textbereich (unten)
export const TextWrapper = styled.div`
  padding: ${spacing.large};
  background-color: ${colors.secondary};
  position: relative; // Für die Platzierung der Icons
`;

// Styled für den Namen des Eintrags
export const EntryName = styled.h3`
  margin: ${spacing.small} 0 ${spacing.medium} 0;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${colors.text};
`;

// Styled für die Infozeilen (wissenschaftlicher Name, Standort, Datum)
export const EntryInfo = styled.p`
  margin: ${spacing.small} 0;
  font-size: 1rem;
  color: ${colors.text};

  @media (min-width: 1024px) {
    font-size: 1.2rem;
  }
`;

// Container für die Icons (innerhalb des TextWrappers)
export const IconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${spacing.small}; // Abstand zwischen den Icons
  margin-top: ${spacing.medium}; // Abstand zum Text
`;

// Styles für die Icons
export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: ${spacing.small};
  border-radius: ${borderRadius.input};

  &:hover {
    background-color: ${colors.backgroundHover};
  }

  svg {
    width: 24px;
    height: 24px;
    fill: ${colors.text};
  }
`;
