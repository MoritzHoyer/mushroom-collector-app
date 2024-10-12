import React from "react";
import Image from "next/image";
import {
  SearchBarContainer,
  StyledSearchBar,
  SearchIcon,
} from "../styles/SearchbarStyle";

const SearchBar = ({ placeholder }) => {
  return (
    <SearchBarContainer>
      <StyledSearchBar type="text" placeholder={placeholder} />
      <SearchIcon>
        <Image
          src="/icons/search-icon.svg"
          alt="Search Icon"
          width={20}
          height={20}
        />
      </SearchIcon>
    </SearchBarContainer>
  );
};

export default SearchBar;
