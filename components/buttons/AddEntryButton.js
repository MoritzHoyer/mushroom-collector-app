import { PrimaryButton } from "../styles/PrimaryButtonStyle";

const AddEntryButton = ({ onClick }) => {
  return <PrimaryButton onClick={onClick}>Eintrag hinzufügen</PrimaryButton>;
};

export default AddEntryButton;
