import styled from "styled-components";

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const LoadingSpinner = styled.div`
  border: 4px solid #f3f3f3; /* Hellgrau */
  border-top: 4px solid #5a67d8; /* Blau */
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
  margin-right: 10px;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Message = styled.p`
  font-size: 16px;
  color: #4a5568; /* Dunkelgrau */
  margin: 10px 0;
`;
