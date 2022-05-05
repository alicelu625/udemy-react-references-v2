import React, { useState } from 'react';

import Card from '../UI/Card';
import ExpensesFilter from './ExpensesFilter';
import ExpensesList from './ExpensesList';
import ExpensesChart from './ExpensesChart';
import './Expenses.css';

const Expenses = (props) => {
    //initialize state as '2020'
    const [filteredYear, setFilteredYear] = useState('2020');

    //update state using value from child component
    const filterChangeHandler = selectedYear => {
        setFilteredYear(selectedYear);
    };

    //returns expense where the expense year = to the selected filter year
    const filteredExpenses = props.items.filter((expense) => {
        return expense.date.getFullYear().toString() === filteredYear;
    });

    /*Method 3 (using variable & conditional expression): Display message if no items found using variable w/ condition
    let expensesContent = <p>No expenses found.</p>;

    if (filteredExpenses.length > 0) {
        expensesContent = filteredExpenses.map((expenses) => {
            <ExpenseItem
                key={expenses.id}
                title={expenses.title}
                amount={expenses.amount}
                date={expenses.date}
            />
        });
    }
    */

    return (
        <div>
            <Card className='expenses'>
                <ExpensesFilter
                    selected={filteredYear}
                    onChangeFilter={filterChangeHandler}
                />
                {/*Method 1 (using && operator): Display message if no items found
                {filteredExpenses.length === 0 && <p>No expenses found.</p>}
                {filteredExpenses.length > 0 &&
                    filteredExpenses.map((expenses) => {
                        <ExpenseItem
                            key={expenses.id}
                            title={expenses.title}
                            amount={expenses.amount}
                            date={expenses.date}
                        />
                    })
                }
                */}

                {/*Method 2 (using ternary expression): Display message if no items found
                {filteredExpenses.length === 0 ? (<p>No expenses found.</p>)
                : (filteredExpenses.map((expenses) => {
                    <ExpenseItem
                        key={expenses.id}
                        title={expenses.title}
                        amount={expenses.amount}
                        date={expenses.date}
                    />
                }))}
                */}

                {/*Method 3 (using variable & conditional expression): Display message if no items found
                {expensesContent}
                */}
                
                <ExpensesChart expenses={filteredExpenses} />
                <ExpensesList items={filteredExpenses} />
            </Card>
        </div>
    );
};

export default Expenses;