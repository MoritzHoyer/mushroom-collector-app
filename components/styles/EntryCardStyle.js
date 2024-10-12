import styled from "styled-components";

export const EntryCardContainer = styled.a`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 15px;
  margin: 10px 0;
  text-decoration: none;
  color: black;
  width: 100%;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
  }
`;

export const EntryImage = styled.img`
  border-radius: 10px;
  width: 100%;
  height: auto;
`;

export const EntryName = styled.h3`
  margin: 10px 0 5px;
`;

export const EntryInfo = styled.p`
  margin: 5px 0;
`;
