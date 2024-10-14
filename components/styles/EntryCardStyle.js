import styled from "styled-components";
import { colors, spacing, borderRadius } from "../../styles";

export const EntryCardContainer = styled.a`
  display: flex;
  flex-direction: column;
  border: 1px solid ${colors.border || "#ccc"};
  border-radius: ${borderRadius.input || "10px"};
  padding: ${spacing.medium};
  margin: ${spacing.small} 0;
  text-decoration: none;
  color: ${colors.text || "black"};

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: ${colors.backgroundHover || "#f9f9f9"};
  
    @media (min-width: 768px) {
    padding: ${spacing.large};
  }

  @media (min-width: 1024px) {
    flex-direction: row;
    padding: ${spacing.large};
  }
`;

export const EntryImage = styled.img`
  border-radius: ${borderRadius.input || "10px"};
  width: 100%;
  height: auto;

  @media (min-width: 1024px) {
    width: 30%;
  }
`;

export const EntryName = styled.h3`
  margin: ${spacing.small} 0 ${spacing.xsmall};

  @media (min-width: 768px) {
    font-size: 20px;
  }

  @media (min-width: 1024px) {
    font-size: 24px;
  }
`;

export const EntryInfo = styled.p`
  margin: ${spacing.xsmall} 0;

  @media (min-width: 768px) {
    font-size: 18px;
  }

  @media (min-width: 1024px) {
    font-size: 20px;
  }
`;
