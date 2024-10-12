import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

export const FooterContainer = styled.footer`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: ${({ theme }) => theme.spacing.medium} 0;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-around;
  z-index: 1000;
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: ${({ theme }) => theme.spacing.medium};

  @media (max-width: 480px) {
    gap: ${({ theme }) => theme.spacing.small};
  }
`;

export const NavLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  font-weight: normal;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  font-size: ${({ theme }) => theme.fontSize.small};
  line-height: 1.2;

  &:hover {
    text-decoration: underline;
  }
`;

export const IconImage = styled(Image)`
  margin-bottom: ${({ theme }) => theme.spacing.small};
  width: ${({ theme }) => theme.iconSize.large};
  height: ${({ theme }) => theme.iconSize.large};
`;
