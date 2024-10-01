import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.header`
  padding: 20px;
  text-align: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled.img`
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

export default function HomePage() {
  return (
    <HeaderContainer>
      <Logo
        src="/shroomie-logo_color_01.svg"
        alt="shroomie: Mushroom Collector App Logo"
      />
    </HeaderContainer>
  );
}
