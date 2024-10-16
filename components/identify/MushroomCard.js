import styled from "styled-components";
import { colors, spacing } from "../../styles"; // Importiere die Werte aus styles.js

// Container für die gesamte Karte
const MushroomCard = styled.div`
  width: 100%;
  border-radius: 16px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background-color: white;
  margin-bottom: ${spacing.extralarge}; // Abstand zwischen den Karten
`;

// Container für das Pilzbild
const ImageWrapper = styled.div`
  width: 100%;
  height: 200px;
  background-image: url(${(props) => props.$imageUrl});
  background-size: cover;
  background-position: center;
`;

// Container für den Textbereich
const TextWrapper = styled.div`
  padding: ${spacing.large};
  background-color: ${(props) => props.$color || colors.background};
`;

// Styled für den Titel (Boletes)
const Title = styled.h3`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0 0 ${spacing.medium} 0;
  color: ${colors.text}; // Verwende die Textfarbe aus styles.js
`;

// Icon in der Titelzeile
const Icon = styled.span`
  margin-right: ${spacing.medium};
  display: inline-block;
  width: 24px;
  height: 24px;
  background-image: url(${(props) => props.$icon});
  background-size: cover;
`;

// Styled für die Beschreibung (Text unterhalb des Titels)
const Description = styled.p`
  margin: 0;
  font-size: 1rem;
  color: ${colors.text}; // Verwende die Textfarbe aus styles.js
`;

// Die Karte-Komponente, die Props akzeptiert
const MushroomInfoCard = ({ title, description, imageUrl, icon, color }) => {
  return (
    <MushroomCard>
      <ImageWrapper $imageUrl={imageUrl} />
      <TextWrapper $color={color}>
        <Title>
          <Icon $icon={icon} />
          {title}
        </Title>
        <Description>{description}</Description>
      </TextWrapper>
    </MushroomCard>
  );
};

export default MushroomInfoCard;
