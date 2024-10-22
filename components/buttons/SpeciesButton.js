import React from "react";
import { SelectSpeciesButton } from "../styles/SpeciesButtonStyle";

const SpeciesButtons = ({ selectedSpecies, setSelectedSpecies }) => {
  const speciesOptions = [
    { type: "boletes", label: "Boletes" },
    { type: "lamellaAnnulus", label: "Lamellar Annulus" },
    { type: "lamella", label: "Lamellar" },
    { type: "otherMushrooms", label: "Other Mushrooms" },
  ];

  return (
    <div>
      {speciesOptions.map((option) => (
        <SelectSpeciesButton
          key={option.type}
          speciesType={option.type}
          $isSelected={selectedSpecies === option.type}
          onClick={() => setSelectedSpecies(option.type)}
        >
          {option.label}
        </SelectSpeciesButton>
      ))}
    </div>
  );
};

export default SpeciesButtons;
