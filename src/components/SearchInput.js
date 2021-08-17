import React from 'react';

function SearchInput({ filterCountry }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search for Country"
        onChange={(e) => {
          e.preventDefault();
          filterCountry(e);
        }}
      />
    </div>
  );
}

export default SearchInput;
