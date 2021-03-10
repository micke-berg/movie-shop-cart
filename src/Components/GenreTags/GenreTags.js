import React from 'react'
import './GenreTags.scss'
import { connect } from 'react-redux';

const GenreTags = ({ genres, ...props }) => {
  return (
    <div className="genre-tags"> 
    {genres.map(genre => (
      <span key={genre} className="genre">{genre}</span>
      ))}
    </div>
  )
}

export default connect(
  (state) => ({ products: state.products.filteredItems }),
  {

  }
)(GenreTags);
