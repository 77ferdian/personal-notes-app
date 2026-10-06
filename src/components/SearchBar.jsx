import React from 'react';
import PropTypes from 'prop-types';
import { HiOutlineSearch } from 'react-icons/hi';

function SearchBar({ keyword, onKeywordChange }) {
  return (
    <div className="search-bar">
      <HiOutlineSearch className="search-bar__icon" />
      <input
        type="text"
        placeholder="Cari catatan berdasarkan judul..."
        value={keyword}
        onChange={(e) => onKeywordChange(e.target.value)}
      />
    </div>
  );
}

SearchBar.propTypes = {
  keyword: PropTypes.string.isRequired,
  onKeywordChange: PropTypes.func.isRequired,
};

export default SearchBar;
