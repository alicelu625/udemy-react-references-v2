import React from 'react';

import ExpenseDate from './ExpenseDate';
import Card from '../UI/Card';
import './ExpenseItem.css';

const ExpenseItem = (props) => {
    /*define function for button click event listener
    const clickHandler = () => {
        console.log('Clicked!!!');
    }
    */
    return (
        <li>
            <Card className='expense-item'>
                <ExpenseDate date={props.date} />
                <div className='expense-item__description'>
                    <h2>{props.title}</h2>
                    <div className='expense-item__price'>${props.amount}</div>
                </div>

                {/*
            //Adding event listener w/ pointer to pre-defined function
            <button onClick={clickHandler}>Change Title</button>

            //Adding event listener as an in-line function
            <button onClick={() => {console.log('Clicked!')}}>Change Title</button>
            */}
            </Card>
        </li>
    );
}

export default ExpenseItem;