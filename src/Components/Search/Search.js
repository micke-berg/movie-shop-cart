import React, { useState, useEffect, useRef } from "react";
import './Search.scss';
import { connect } from 'react-redux';
import { filterSearchAction } from '../../actions/productActions';
import SearchIcon from '@material-ui/icons/Search';

const Search = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const initial = useRef(true);

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }

    const timer = setTimeout(() => {
      props.filterSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);
  
  console.log('search', searchTerm)

  return (
    <div className="search-content">
      <div className="search">
        <form>
          <input 
            type="text" 
            className="search__input" 
            aria-label="search" 
            placeholder="Titles, genres..."
            onChange={(event) => setSearchTerm(event.currentTarget.value)}
            value={searchTerm}
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
