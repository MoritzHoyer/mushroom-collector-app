import styled from "styled-components";

export const HeaderContainer = styled.header`
  text-align: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
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
