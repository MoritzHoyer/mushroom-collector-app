import styled from "styled-components";
import { spacing, colors } from "../../styles";

export const HeaderContainer = styled.header`
  display: flex;
  position: absolute;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing.small} ${spacing.large};
  background-color: ${colors.secondary};
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
`;

export const Logo = styled.img`
  max-width: 100%;
  height: auto;
  max-height: 40px;

  @media (min-width: 768px) {
    max-height: 80px;
  }

  @media (min-width: 1024px) {
    max-height: 100px;
  }
`;
