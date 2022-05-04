import React, { useState } from 'react';

import './ExpenseForm.css';

const ExpenseForm = (props) => {
    //use state to store values & have them survive
    //states initialized with a string because all input values are strings
    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredAmount, setEnteredAmount] = useState('');
    const [enteredDate, setEnteredDate] = useState('');

    /*using 1 state - pass in object as value
    const [userInput, setUserInput] = useState({
        enteredTitle: '',
        enteredAmount: '',
        enteredDate: '',
    });
    */

    //Vanilla JavaScript event handler
    //document.getElementById('').addEventListener('click', (event) => {})

    //event object holds alot of data
    const titleChangeHandler = (event) => {
        setEnteredTitle(event.target.value);

        /*If using 1 state with object as value (copy state & update properties)
        setUserInput({
            ...userInput,
            enteredTitle: event.target.value,
        });
        */
        
        /*updating state that depends on previous state (copy prev state & update properties)
        setUserInput((prevState) => {
            return { ...prevState, enteredTitle: event.target.value };
        });
        */
    };

    const amountChangeHandler = (event) => {
        setEnteredAmount(event.target.value);

        /*If using 1 state with object as value
        setUserInput({
            ...userInput,
            enteredAmount: event.target.value,
        });
        */
    };

    const dateChangeHandler = (event) => {
        setEnteredDate(event.target.value);
    };

    const submitHandler = (event) => {
        //prevents browser default behavior to send request to server (page reload)
        event.preventDefault();

        //combine all values into object
        const expenseData = {
            title: enteredTitle,
            amount: enteredAmount,
            date: new Date(enteredDate), //convert into Date object
        };

        //save new expense data by passing data to function in parent component (NewExpense)
        props.onSaveExpenseData(expenseData);

        //clear states - set to empty string
        setEnteredTitle('');
        setEnteredAmount('');
        setEnteredDate('');
    };

    return (
        <form onSubmit={submitHandler}>
            <div className='new-expense__controls'>
                <div className='new-expense__control'>
                    <label>Title</label>
                    <input
                        type='text'
                        value={enteredTitle}
                        onChange={titleChangeHandler}
                    />
                </div>
                <div className='new-expense__control'>
                    <label>Amount</label>
                    <input
                        type='number'
                        min='0.01'
                        step='0.01'
                        value={enteredAmount}
                        onChange={amountChangeHandler}
                    />
                </div>
                <div className='new-expense__control'>
                    <label>Date</label>
                    <input
                        type='date'
                        min='2019-01-01'
                        max='2022-12-31'
                        value={enteredDate}
                        onChange={dateChangeHandler}
                    />
                </div>
            </div>
            <div className='new-expense__actions'>
                <button type='submit'>Add Expense</button>
            </div>
        </form>
    );
};

export default ExpenseForm;