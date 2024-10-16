import React from "react";
import { SelectSpeciesButton } from "../styles/SpeciesButtonStyle";

const SpeciesButtons = () => {
  return (
    <div>
      <SelectSpeciesButton speciesType="boletes">Boletes</SelectSpeciesButton>
      <SelectSpeciesButton speciesType="lamellaAnnulus">
        Lamellar Annulus
      </SelectSpeciesButton>
      <SelectSpeciesButton speciesType="lamella">Lamellar</SelectSpeciesButton>
      <SelectSpeciesButton speciesType="otherMushrooms">
        Other Mushrooms
      </SelectSpeciesButton>
    </div>
  );
};

export default SpeciesButtons;
