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

export const StyledSearchBar = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 40px 10px 10px; /* Behalte das Padding wie zuvor */
  margin: ${spacing.small};
  border: 1px solid #ccc;
  border-radius: ${borderRadius.button}; /* Gleiche Rundung */
  background-color: transparent;
  width: 100%;

  &:focus-within {
    outline: none;
    box-shadow: ${shadows.focus};
    border-color: ${colors.primary};
  }

  @media (min-width: 768px) {
    padding: 12px 50px 12px 15px;
    font-size: 18px;
    border-radius: 30px;
  }

  @media (min-width: 1024px) {
    padding: 15px 60px 15px 20px;
    font-size: 20px;
    border-radius: 35px;
  }
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  background: transparent;
  color: ${colors.text};
  font-size: inherit;
  width: 100%;

  &::placeholder {
    color: ${colors.disabled};
  }

  &:focus {
    outline: none;
  }
`;

export const IconImage = styled(Image)`
  margin-right: ${spacing.small};
  width: ${iconSize.medium}; /* Behalte die Größe bei */
  height: ${iconSize.medium};

  @media (min-width: 768px) {
    width: ${iconSize.large};
    height: ${iconSize.large};
  }
`;
