import styled from "styled-components";
import { spacing, fontSize, borderRadius, shadows, colors } from "../../styles";

export const CardContainer = styled.div`
  border-radius: ${borderRadius.input};
  box-shadow: ${shadows.cardHover};
  overflow: hidden;
  background-color: ${colors.background};
  margin-bottom: ${spacing.extralarge};
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  padding: ${spacing.medium};
  background-color: ${(props) => props.color || colors.primary};
`;

export const IconImage = styled.img`
  margin-right: ${spacing.small};
`;

export const CardBody = styled.div`
  padding: ${spacing.medium};
`;

export const Description = styled.p`
  font-size: ${fontSize.medium};
  color: ${colors.text};
  margin: 0;
`;
