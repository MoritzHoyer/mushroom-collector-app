import styled from "styled-components";
import { colors, spacing, borderRadius, shadows, fontSize } from "../../styles";

export const PrimaryButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: ${spacing.medium};
  margin: ${spacing.small};
  background-color: ${colors.primary};
  color: white;
  border: none;
  border-radius: ${borderRadius.button};
  cursor: pointer;
  font-size: ${fontSize.medium};
  width: 100%;

  &:hover {
    background-color: ${colors.primaryHover};
    box-shadow: ${shadows.hover};
  }

  &:focus {
    outline: none;
    box-shadow: ${shadows.focus};
  }

  &:disabled {
    background-color: ${colors.disabled};
    cursor: not-allowed;
  }

  @media (min-width: 768px) {
    padding: ${spacing.large};
    font-size: 18px;
  }
`;
