import React from 'react'
import './Filter.scss'

const Filter = ({ price, genre, filterMovies, sortMovies }) => {
  return (
    <div className="filter">
      <div className="filter-result"></div>
      <div className="filter-select">
        <div className="filter-sort">
          <select name="" id="" value={price} onChange={sortMovies} className="selected">
            <option value="">Price</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
          <div className="custom-arrow1"></div>
        </div>
        <div className="filter-genre">
          <select name="" id="" value={genre} onChange={filterMovies} >
            <option value="">Genre</option>
            <option value="Action">Action</option>
            <option value="Thriller">Thriller</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
            <option value="Crime">Crime</option>
          </select>
          <div className="custom-arrow2"></div>
        </div>
      </div>
    </div>
  )
}

export default Filter
