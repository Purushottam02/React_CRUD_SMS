import React from "react";

const SearchBar = ({ onSearchInputChange }) => {
  const handleChange = (e) => {
    onSearchInputChange(e.target.value);
  };

  return (
    <div>
      <input type="search" placeholder="Search here" onChange={handleChange} />
    </div>
  );
};

export default SearchBar;
