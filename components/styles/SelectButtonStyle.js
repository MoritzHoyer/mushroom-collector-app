import styled from "styled-components";
import Image from "next/image";

export const SelectButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.medium};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50px;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.medium};
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  white-space: nowrap;
  width: auto;
  min-width: 0;

  &:hover,
  &:active {
    border-width: 2px;
    color: ${({ theme }) => theme.colors.primaryHover};
    border-color: ${({ theme }) => theme.colors.primaryHover};
    background-color: ${({ theme }) => theme.colors.backgroundHover};
  }
`;

export const IconImage = styled(Image)`
  margin-right: ${({ theme }) => theme.spacing.small};
  width: ${({ theme }) => theme.iconSize.large};
  height: ${({ theme }) => theme.iconSize.large};
`;
