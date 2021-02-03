import React from 'react'
import './GenreTags.scss'

const GenreTags = ({ genres, ...props }) => {
  return (
    <div className="genre-tags"> 
    {genres.map(genre => (
      <span key={genre} className="genre">{genre}</span>
      ))}
    </div>
  )
}

export default GenreTags
