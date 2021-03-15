import React from 'react'
import './GenreTags.scss'

const GenreTags = ({ genres, ...props }) => {
  return (
    <div className="genre-tags"> 
    {genres.map(genre => (
      <span key={genre.genreId} className="genre">{genre.genreId}</span>
      ))}
    </div>
  )
}

export default GenreTags;