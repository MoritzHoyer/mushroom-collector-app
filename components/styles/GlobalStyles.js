import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.medium};
`;

export const PageTitle = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`;
