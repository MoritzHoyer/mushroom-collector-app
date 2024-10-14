import React from "react";
import {
  StyledSearchBar,
  SearchInput,
  IconImage,
} from "../styles/SearchbarStyle";

const SearchBar = ({ placeholder }) => {
  return (
    <StyledSearchBar>
      <IconImage
        src="/icons/search-icon.svg"
        alt="Search Icon"
        width={24}
        height={24}
      />
      <SearchInput type="text" placeholder={placeholder} />
    </StyledSearchBar>
  );
};

export default SearchBar;
