import React from "react";
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

export default function AddEntryButton({ onClick }) {
  return <StyledButton onClick={onClick}>Add Mushroom</StyledButton>;
}
