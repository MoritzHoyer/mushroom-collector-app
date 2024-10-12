import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding-bottom: ${({ theme }) => theme.spacing.footerPadding};
`;

export const Label = styled.label`
  display: block; /* Dies ist notwendig, um das Label über dem Input anzuordnen */
  text-align: left; /* Stelle sicher, dass alle Labels linksbündig ausgerichtet sind */
  font-size: ${({ theme }) => theme.fontSize.medium};
  margin-bottom: ${({ theme }) => theme.spacing.small};
  color: ${({ theme }) => theme.colors.text};
  width: 100%; /* Wichtig, damit das Label dieselbe Breite wie das Input-Feld hat */
`;

export const Instructions = styled.p`
  font-size: ${({ theme }) => theme.fontSize.medium};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

export const PlaceholderContainer = styled.div`
  width: 100%;
  height: 300px;
  border: 2px dashed ${({ theme }) => theme.colors.border};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const PlaceholderText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.large};
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`;

export const SliderContainer = styled.div`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

export const SliderImage = styled.img`
  width: 100%;
  height: auto;
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.medium};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.input};
  font-size: ${({ theme }) => theme.fontSize.medium}; /* Schriftgröße */
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.medium};
  min-height: 100px;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.input};
  font-size: ${({ theme }) => theme.fontSize.medium}; /* Schriftgröße */
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.small};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  justify-content: flex-start;
`;

export const ErrorMessage = styled.div`
  color: red;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  font-size: ${({ theme }) => theme.fontSize.small};
`;
