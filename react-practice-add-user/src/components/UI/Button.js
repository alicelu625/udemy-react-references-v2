import React from 'react';

import classes from './Button.module.css';

const Button = (props) => {
  return (
    <button
      className={classes.button}
      type={props.type || 'button'} //type passed from props OR fallback value
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
