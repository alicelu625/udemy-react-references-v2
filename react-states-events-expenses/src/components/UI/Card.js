import React from 'react';

import './Card.css';

//wrapper component to remove redundant styling
const Card = (props) => {
    //include css classes from what is received via props
    const classes = 'card ' + props.className;

    return <div className={classes}>{props.children}</div>;
};

export default Card;