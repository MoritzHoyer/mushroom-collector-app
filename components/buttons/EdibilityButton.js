import React from "react";
import { SelectEdibilityButton } from "../styles/EdibilityButtonStyle";

const EdibilityButtons = () => {
  return (
    <div>
      <SelectEdibilityButton>Deadly Toxic</SelectEdibilityButton>
      <SelectEdibilityButton>Toxic</SelectEdibilityButton>
      <SelectEdibilityButton>Inedible</SelectEdibilityButton>
      <SelectEdibilityButton>Edible Limited</SelectEdibilityButton>
      <SelectEdibilityButton>Edible</SelectEdibilityButton>
    </div>
  );
};

export default EdibilityButtons;
