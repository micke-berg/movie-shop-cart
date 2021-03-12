import React, { useState, useEffect, useRef } from "react";
import './Search.scss';
import { connect } from 'react-redux';
import { filterSearch } from '../../actions/productActions';
import SearchIcon from '@material-ui/icons/Search';

const Search = (props) => {
  const [searchTermState, setSearchTermState] = useState("");
  const initial = useRef(true);

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }

    const timer = setTimeout(() => {
      props.filterSearch(searchTermState);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTermState]);

  return (
    <div className="search-content">
      <div className="search">
        <input 
          type="text" 
          className="search__input" 
          aria-label="search" 
          placeholder="Titles, genres..."
          onChange={(event) => setSearchTermState(event.currentTarget.value)}
          value={searchTermState}
        ></input>
        <button className="search__button" aria-label="submit search">
          <SearchIcon fontSize="medium" className="search-icon" />
        </button>
      </div>
    </div>
  )
}
// export default Search

export default connect(
  (state) => ({}),
  {
    filterSearch
  }
)(Search);