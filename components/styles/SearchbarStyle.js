import styled from "styled-components";

export const SearchBarContainer = styled.div`
  position: relative; // Position relativ für das Positionieren des Icons
  width: 100%;
`;

export const StyledSearchBar = styled.input`
  width: 100%;
  padding: 10px 40px 10px 10px;
  margin: ${({ theme }) => theme.spacing.small};
  border: 1px solid #ccc;
  border-radius: 25px;
`;

export const SearchIcon = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
`;
