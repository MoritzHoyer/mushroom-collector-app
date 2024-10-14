import React from "react";
import { PrimaryButton } from "../styles/PrimaryButtonStyle";

export default function SubmitButtonComponent({ isLoading }) {
  return (
    <PrimaryButton type="submit" disabled={isLoading}>
      {isLoading ? "Wird hochgeladen..." : "Eintrag hinzufügen"}
    </PrimaryButton>
  );
}
