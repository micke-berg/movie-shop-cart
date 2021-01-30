import React from 'react'
import './Filter.scss'

const Filter = ({ count, price, genre, filterMovies, sortMovies }) => {
  return (
    <div className="filter">
      <div className="filter-result"></div>
      <div className="filter-select">
        <div className="filter-sort">
          <select name="" id="" value={price} onChange={sortMovies}>
            <option value="">Price</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
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
        </div>
      </div>
    </div>
  )
}

export default Filter
