import styled from "styled-components";
import { colors, fontSize, spacing } from "../../styles";

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const LoadingSpinner = styled.div`
  border: 4px solid ${colors.background || "#f3f3f3"};
  border-top: 4px solid ${colors.primary};
  border-radius: 50%;
  width: ${spacing.large};
  height: ${spacing.large};
  animation: spin 1s linear infinite;
  margin-right: ${spacing.small};

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Message = styled.p`
  font-size: ${fontSize.medium};
  color: ${colors.text || "#4a5568"};
  margin: ${spacing.small} 0;

  @media (min-width: 768px) {
    font-size: ${fontSize.large};
  }
`;
