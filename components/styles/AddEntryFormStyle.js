import styled from "styled-components";
import { spacing, fontSize, colors, borderRadius, shadows } from "../../styles";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Label = styled.label`
  display: block;
  text-align: left;
  font-size: ${fontSize.medium};
  margin-bottom: ${spacing.medium};
  color: ${colors.text};
  width: 100%;
`;

export const PlaceholderContainer = styled.div`
  width: 100%;
  height: 200px;
  border: 1.5px solid ${colors.border};
  border-radius: 28px;
  margin-bottom: ${spacing.large};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  @media (min-width: 768px) {
    height: 250px;
  }

  @media (min-width: 1024px) {
    height: 300px;
  }
`;

export const PlaceholderText = styled.p`
  font-size: ${fontSize.large};
  color: ${colors.tertiary};
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  pointer-events: none;
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const Input = styled.input`
  width: 100%;
  padding: ${spacing.medium};
  margin-bottom: ${spacing.large};
  border: 1.5px solid ${colors.border};
  border-radius: ${borderRadius.button};
  font-size: ${fontSize.medium};

  &:focus {
    border-color: ${colors.primary};
 
  @media (min-width: 768px) {
    padding: ${spacing.large};
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: ${spacing.medium};
  min-height: 100px;
  margin-bottom: ${spacing.extralarge};
  border: 1px solid ${colors.border};
  border-radius: 16px;
  font-size: ${fontSize.medium};

  &:focus {
    border-color: ${colors.primary};
    box-shadow: ${shadows.focus};
  }

  @media (min-width: 768px) {
    padding: ${spacing.large};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.small};
  margin-bottom: ${spacing.extralarge};
  justify-content: flex-start;
  width: 100%;
  align-items: flex-start;
`;
export const ErrorMessage = styled.div`
  color: ${colors.error};
  margin-bottom: ${spacing.medium};
  font-size: ${fontSize.small};
`;
