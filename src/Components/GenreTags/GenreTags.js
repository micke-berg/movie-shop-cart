import React from 'react'
import './GenreTags.scss'

const GenreTags = ({genres}) => {
  return (
    <div class="genre-tags"> 
    {genres.map(genre => (
      <span className="genre">{genre}</span>
      ))}
    </div>
  )
}

export default GenreTags
