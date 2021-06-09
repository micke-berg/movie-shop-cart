import React, { useState, useEffect, useRef } from "react";
import './Search.scss';
import { connect } from 'react-redux';
import { filterSearchAction } from '../../actions/productActions';
import SearchIcon from '@material-ui/icons/Search';

const Search = ({ filterSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const initial = useRef(true);

  const submitHandler = (event) => {
    event.preventDefault();
    setSearchTerm(event.currentTarget.value)
  }

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }
    
    filterSearch(searchTerm);
  }, [filterSearch, searchTerm]);
  
  console.log('search', searchTerm)

  return (
    <div className="search-content">
      <div className="search">
        <form onSubmit={submitHandler}>
          <input 
            type="text" 
            className="search__input" 
            aria-label="search" 
            placeholder="Titles, genres..."
            onChange={(event) => setSearchTerm(event.currentTarget.value)}
          ></input>
          <button className="search__button" aria-label="submit search">
            <SearchIcon fontSize="medium" className="search-icon" />
          </button>
        </form>
      </div>
    </div>
  )
}

const mapStateToProps = ( state ) => ({});

const mapDispatchToProps = (dispatch) => ({
  filterSearch: (products, searchTerm) => dispatch(filterSearchAction(products, searchTerm)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
