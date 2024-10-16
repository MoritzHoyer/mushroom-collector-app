import styled from "styled-components";
import { colors, spacing } from "@/styles";

// Container für die gesamte Warnung und Symbole
const ExplanationContainer = styled.div`
  // margin-top: ${spacing.large};
  // // padding: ${spacing.large};
`;

// Linie für den oberen und unteren Rand
const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${colors.border};
  margin: ${spacing.extralarge} 0;
`;

// Titel für die Warnung
const WarningTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: ${spacing.medium};
  color: ${colors.text};
`;

// Text der Warnung
const WarningText = styled.p`
  font-size: 1rem;
  margin-bottom: ${spacing.large};
  color: ${colors.text};
  line-height: 1.5;
`;

// Titel der Symbolerklärung
const ExplanationTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: ${spacing.medium};
  color: ${colors.text};
`;

// Container für jedes Symbol und die Beschreibung
const SymbolRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${spacing.medium};
`;

// Icon-Styling
const SymbolIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: ${spacing.medium};
`;

// Beschreibung des Symbols
const SymbolDescription = styled.p`
  margin: 0;
  font-size: 1rem;
  color: ${colors.text};
`;

const SymbolExplanation = () => {
  return (
    <ExplanationContainer>
      <Divider />
      <WarningTitle>Warning</WarningTitle>
      <WarningText>
        When picking mushrooms, it is in your own interest to exercise the
        greatest possible caution. In order to be able to identify a mushroom
        with certainty, not only the picture but also each of the described
        characteristics must be compared with the mushroom found. If there is
        the slightest doubt about the identity of a mushroom, the find should be
        presented to a mushroom expert or a mushroom advisory center for
        examination.
      </WarningText>
      <Divider />
      <ExplanationTitle>Explanation of symbols</ExplanationTitle>
      <SymbolRow>
        <SymbolIcon src="/icons/deadly-toxic-icon.svg" alt="Deadly poisonous" />
        <SymbolDescription>deadly toxic</SymbolDescription>
      </SymbolRow>
      <SymbolRow>
        <SymbolIcon src="/icons/toxic-icon.svg" alt="Poisonous" />
        <SymbolDescription>toxic</SymbolDescription>
      </SymbolRow>
      <SymbolRow>
        <SymbolIcon src="/icons/inedible-icon.svg" alt="Inedible" />
        <SymbolDescription>inedible</SymbolDescription>
      </SymbolRow>
      <SymbolRow>
        <SymbolIcon
          src="/icons/edible-limited-icon.svg"
          alt="Limited edibility"
        />
        <SymbolDescription>eingeschränkt essbar</SymbolDescription>
      </SymbolRow>
      <SymbolRow>
        <SymbolIcon src="/icons/edible-icon.svg" alt="Edible" />
        <SymbolDescription>edible</SymbolDescription>
      </SymbolRow>
    </ExplanationContainer>
  );
};

export default SymbolExplanation;
