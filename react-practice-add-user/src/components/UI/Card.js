import React from 'react';

import classes from './Card.module.css';

const Card = (props) => {
  //outputs content of the card along with the styling of the content via props
  return <div className={`${classes.card} ${props.className}`}>{props.children}</div>;
};

export default Card;
