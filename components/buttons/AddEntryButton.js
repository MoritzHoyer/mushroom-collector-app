import styled from "styled-components";

const StyledButton = styled.button`
  width: 100%;
  padding: 10px 20px;
  border: none;
  border-radius: 25px;
  background-color: #5a67d8;
  color: white;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;

  &:hover {
    background-color: #434190;
  }
`;

const AddEntryButton = ({ onClick }) => {
  return <StyledButton onClick={onClick}>Add Entry</StyledButton>;
};

export default AddEntryButton;
