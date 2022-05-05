import React from 'react';

import './ExpensesFilter.css';

const ExpensesFilter = (props) => {
    //triggered whenever a year is chosen in the dropdown
    const dropdownChangeHandler = (event) => {
        //pass year value to function in parent component (Expenses)
        props.onChangeFilter(event.target.value);
    };

    return (
        <div className='expenses-filter'>
            <div className='expenses-filter__control'>
                <label>Filter by year</label>
                <select value={props.selected} onChange={dropdownChangeHandler}>
                    <option value='2022'>2022</option>
                    <option value='2021'>2021</option>
                    <option value='2020'>2020</option>
                    <option value='2019'>2019</option>
                </select>
            </div>
        </div>
    );
};

export default ExpensesFilter;