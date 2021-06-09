import React from 'react'
import './GenreTags.scss'

const GenreTags = ({ productGenres, genres }) => {
  return (
    <div className="genre-tags"> 
    {productGenres.map(product => (
      <span key={product.genreId} className="genre">{genres[product.genreId - 1].name}</span>
      ))}
    </div>
  )
}

export default GenreTags;