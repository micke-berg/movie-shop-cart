/* eslint-disable no-nested-ternary */
import React from 'react';
import './Rating.scss';

import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarOutlineIcon from '@material-ui/icons/StarOutline';

function Rating({ rating, ...props }) {
  return (
    <div className="rating">
      <span className="accent">
        {' '}
        {rating >= 2 ? <StarIcon fontSize="small" /> : rating >= 1 ? <StarHalfIcon fontSize="small"/> : <StarOutlineIcon fontSize="small"/>}
        {' '}
      </span>
      <span className="accent">
        {' '}
        {rating >= 4 ? <StarIcon fontSize="small"/> : rating >= 3 ? <StarHalfIcon fontSize="small"/> : <StarOutlineIcon fontSize="small"/>}
        {' '}
      </span>
      <span className="accent">
        {' '}
        {rating >= 6 ? <StarIcon fontSize="small"/> : rating >= 5 ? <StarHalfIcon fontSize="small"/> : <StarOutlineIcon fontSize="small"/>}
        {' '}
      </span>
      <span className="accent">
        {' '}
        {rating >= 8 ? <StarIcon fontSize="small"/> : rating >= 7 ? <StarHalfIcon fontSize="small"/> : <StarOutlineIcon fontSize="small"/>}
        {' '}
      </span>
      <span className="accent">
        {' '}
        {rating >= 10 ? <StarIcon fontSize="small"/> : rating >= 9 ? <StarHalfIcon fontSize="small"/> : <StarOutlineIcon fontSize="small"/>}
        {' '}
      </span>
    </div>
  );
}

export default Rating;
