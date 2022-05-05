import React, { useState } from 'react';

import ExpenseForm from './ExpenseForm';
import './NewExpense.css';

const NewExpense = (props) => {
    //whether form is showing or not
    const [isEditing, setIsEditing] = useState(false);

    //pass in expense data object from ExpenseForm component
    const saveExpenseDataHandler = (enteredExpenseData) => {
        const expenseData = {
            ...enteredExpenseData,
            id: Math.random().toString()
        };
        //add new expense data by passing data to function in parent component (App)
        props.onAddExpense(expenseData);
        //close form when form is submitted
        setIsEditing(false);
    };

    //open form when "Add New Expense" button is clicked
    const startEditingHandler = () => {
        setIsEditing(true);
    };

    //close form when "Cancel" button is pressed
    const stopEditingHandler = () => {
        setIsEditing(false);
    };

    return (
        <div className='new-expense'>
            {!isEditing && (
                <button onClick={startEditingHandler}>Add New Expense</button>
            )}
            {isEditing && (
                <ExpenseForm
                    onSaveExpenseData={saveExpenseDataHandler}
                    onCancel={stopEditingHandler}
                />
            )}
        </div>
    );
};

export default NewExpense;