import React from 'react';
import './Button.scss';

const Button = ({ label, primary, secondary, tertiary, ghost }) => {

  if(tertiary) {
    return <button>tertiary</button>;
  } else if (secondary) {
    if (ghost) {
      return <button className="button-container secondary-button secondary-ghost-button">{label}</button>;
    } else {
      return <button className="button-container secondary-button">{label}</button>;
    }
  } else {
    if (ghost) {
      return <button className="button-container primary-button primary-ghost-button">{label}</button>;
    } else {
      return <button className="button-container primary-button">{label}</button>;
    }
  }
}

export default Button;
