import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { HiOutlineSearch, HiOutlineX } from 'react-icons/hi';
import LocaleContext from '../contexts/LocaleContext';

function SearchBar({ keyword, onKeywordChange }) {
  const { content } = useContext(LocaleContext);

  const handleClear = () => {
    onKeywordChange('');
  };

  return (
    <div className="search-bar">
      <span className="search-bar__icon-wrapper" aria-hidden="true">
        <HiOutlineSearch className="search-bar__icon" />
      </span>
      <input
        type="text"
        className="search-bar__input"
        placeholder={content.searchPlaceholder}
        value={keyword}
        onChange={(e) => onKeywordChange(e.target.value)}
        aria-label={content.searchPlaceholder}
      />
      {keyword && (
        <button
          type="button"
          className="search-bar__clear"
          onClick={handleClear}
          title={content.clearSearch}
          aria-label={content.clearSearch}
        >
          <HiOutlineX size={16} />
        </button>
      )}
    </div>
  );
}

SearchBar.propTypes = {
  keyword: PropTypes.string.isRequired,
  onKeywordChange: PropTypes.func.isRequired,
};

export default SearchBar;
