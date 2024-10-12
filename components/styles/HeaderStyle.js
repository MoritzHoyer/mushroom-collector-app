import styled from "styled-components";

export const HeaderContainer = styled.header`
  padding: ${({ theme }) => theme.spacing.large};
  text-align: center;
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
`;

export const Logo = styled.img`
  max-width: 100%;
  height: auto;
  max-height: 10vh;

  @media (max-width: 768px) {
    max-height: 80px;
  }

  @media (max-width: 480px) {
    max-height: 40px;
  }
`;
