import React from 'react'
import './GridContainer.scss';

const GridContainer = (props) => {
  return (
    <div className="grid-container">
      {props.children}
    </div>
  )
}

export default GridContainer;
