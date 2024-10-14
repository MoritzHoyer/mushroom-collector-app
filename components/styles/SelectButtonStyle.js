import styled from "styled-components";
import {
  colors,
  spacing,
  iconSize,
  shadows,
  fontSize,
  borderRadius,
} from "../../styles";
import Image from "next/image";

export const SelectButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing.medium};
  border: 2px solid
    ${({ $isSelected }) => ($isSelected ? colors.primaryHover : colors.primary)};
  border-radius: ${borderRadius.button};
  background-color: ${({ $isSelected }) =>
    $isSelected ? colors.backgroundHover : "transparent"};
  color: ${({ $isSelected }) =>
    $isSelected ? colors.primaryHover : colors.primary};
  font-size: ${fontSize.medium};
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  white-space: nowrap;
  width: auto;
  min-width: 0;

  &:hover {
    color: ${colors.primaryHover};
    border-color: ${colors.primaryHover};
    background-color: ${colors.backgroundHover};
    box-shadow: ${shadows.hover};
  }

  ${({ $isSelected }) =>
    $isSelected &&
    `
    box-shadow: ${shadows.focus}; 
    border-width: 2px;
  `}

  &:focus {
    outline: none;
    box-shadow: ${shadows.focus};
  }

  @media (min-width: 768px) {
    padding: ${spacing.large};
    font-size: 18px;
  }
`;

export const IconImage = styled(Image)`
  margin-right: ${spacing.small};
  width: ${iconSize.large};
  height: ${iconSize.large};

  @media (min-width: 768px) {
    width: ${iconSize.large};
    height: ${iconSize.large};
  }
`;
