import { useState } from 'react';
import { SearchbarStyled } from './SearchbarStyled';
import PropTypes from 'prop-types';

const Searchbar = ({ setSearch }) => {
  const [searchInput, setSearchInput] = useState('');

  const onHandleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    setSearch(searchInput);
  };

  return (
    <SearchbarStyled>
      <form className="SearchForm" onSubmit={onFormSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onHandleChange}
        />
      </form>
    </SearchbarStyled>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  setSearch: PropTypes.func,
};
