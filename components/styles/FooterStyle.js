import styled from "styled-components";
import { spacing, colors, iconSize, fontSize } from "../../styles";

export const FooterContainer = styled.footer`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: ${spacing.small} 0;
  text-align: center;
  background-color: ${colors.secondary};
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  z-index: 1000;
  height: 70px;

  @media (min-width: 768px) {
    padding: ${spacing.medium} 0;
  }

  @media (min-width: 1024px) {
    justify-content: center;
    padding: ${spacing.large} 0;
  }
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  width: 100%;
  gap: ${spacing.small};

  @media (min-width: 768px) {
    gap: ${spacing.medium};
  }
`;

export const NavLink = styled.div`
  text-decoration: none !important; // Entfernt jegliche Unterstreichung
  color: ${({ $isActive }) => ($isActive ? colors.primary : colors.text)};
  font-weight: normal;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  font-size: ${fontSize.small};
  line-height: 1.2;
  height: 100%;

  &:hover {
    color: ${colors.primary};
    text-decoration: none !important; // Sicherstellt, dass die Links beim Hover nicht unterstrichen sind
  }

  a {
    text-decoration: none !important; // Deckt jede Art von Vererbung ab
    color: inherit; // Vererbt die Farbe des Links korrekt
  }

  @media (min-width: 768px) {
    font-size: ${fontSize.medium};
  }
`;

export const IconImage = styled.img`
  margin-bottom: 5px;
  width: ${iconSize.large};
  height: ${iconSize.large};

  @media (min-width: 768px) {
    width: ${iconSize.large};
    height: ${iconSize.large};
  }
`;
