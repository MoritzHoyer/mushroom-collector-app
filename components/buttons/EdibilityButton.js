import React from "react";
import { SelectEdibilityButton } from "../styles/EdibilityButtonStyle";

const EdibilityButtons = ({ selectedEdibility, setSelectedEdibility }) => {
  const options = [
    "Deadly Toxic",
    "Toxic",
    "Inedible",
    "Edible Limited",
    "Edible",
  ];

  return (
    <div>
      {options.map((option) => (
        <SelectEdibilityButton
          key={option}
          $isSelected={selectedEdibility === option}
          onClick={() => setSelectedEdibility(option)}
        >
          {option}
        </SelectEdibilityButton>
      ))}
    </div>
  );
};

export default EdibilityButtons;
