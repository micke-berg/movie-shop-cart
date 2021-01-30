/* eslint-disable no-nested-ternary */
import React from 'react';
import './Rating.scss';

import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarOutlineIcon from '@material-ui/icons/StarOutline';

function Rating({ rating }) {
  return (
    <div className="rating">
      <span className="accent">
        {' '}
        {/* <i className={rating >= 2 ? 'fa fa-star' : rating >= 1 ? 'fa fa-star-half-o' : 'fa fa-star-o'} /> */}
        {rating >= 2 ? <StarIcon /> : rating >= 1 ? <StarHalfIcon /> : <StarOutlineIcon />}
        {' '}
      </span>
      <span className="accent">
        {' '}
        {rating >= 4 ? <StarIcon /> : rating >= 3 ? <StarHalfIcon /> : <StarOutlineIcon />}
        {' '}
      </span>
      <span className="accent">
        {' '}
        {rating >= 6 ? <StarIcon /> : rating >= 5 ? <StarHalfIcon /> : <StarOutlineIcon />}
        {' '}
      </span>
      <span className="accent">
        {' '}
        {rating >= 8 ? <StarIcon /> : rating >= 7 ? <StarHalfIcon /> : <StarOutlineIcon />}
        {' '}
      </span>
      <span className="accent">
        {' '}
        {rating >= 10 ? <StarIcon /> : rating >= 9 ? <StarHalfIcon /> : <StarOutlineIcon />}
        {' '}
      </span>
    </div>
  );
}

export default Rating;
