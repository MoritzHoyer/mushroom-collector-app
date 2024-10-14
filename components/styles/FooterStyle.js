import styled from "styled-components";
import { spacing, colors, iconSize, fontSize } from "../../styles";

export const FooterContainer = styled.footer`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: ${spacing.medium} 0;
  text-align: center;
  background-color: ${colors.background};
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  z-index: 1000;

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
  gap: ${spacing.medium};

  @media (min-width: 768px) {
    gap: ${spacing.medium};
  }
`;

export const NavLink = styled.div`
  margin-bottom: ${spacing.small};
  text-decoration: none;
  color: ${colors.text};
  font-weight: normal;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  font-size: ${fontSize.small};
  line-height: 1.2;

  &:hover {
    text-decoration: underline;
  }

  @media (min-width: 768px) {
    font-size: ${fontSize.medium};
  }
`;

export const IconImage = styled.img`
  margin-top: ${spacing.small};
  margin-bottom: ${spacing.small};
  width: ${iconSize.large};
  height: ${iconSize.large};

  @media (min-width: 768px) {
    width: ${iconSize.large};
    height: ${iconSize.large};
  }
`;
