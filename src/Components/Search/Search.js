import React, { useState, useEffect, useRef } from "react";
import './Search.scss';

import SearchIcon from "@material-ui/icons/Search";

const Search = ({ searchTerm, setSearchTerm }) => {
  const [state, setState] = useState("");
  const initial = useRef(true);

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }

    const timer = setTimeout(() => {
      setSearchTerm(state);
    }, 500);

    return () => clearTimeout(timer);
  }, [setSearchTerm, state]);
  
  return (

    <div className="search">
          <SearchIcon />
        <form className='searchbar-content'>
          <input
            type="search"
            placeholder="Search for a title..."
            onChange={(event) => setState(event.currentTarget.value)}
            value={state}
          />
      </form>
    </div>
  )
}

export default Search
