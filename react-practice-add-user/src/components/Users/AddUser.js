import React, { useState } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import classes from './AddUser.module.css';

const AddUser = (props) => {
  //inialize state for each input as empty string
  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredAge, setEnteredAge] = useState('');
  //initialize error state as undefined
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    //prevent default submission event
    event.preventDefault();

    //validation check - length of input
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      //update error state with error title & message
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age (non-empty values).',
      });
      return;
    }
    if (+enteredAge < 1) { //forced conversion from number -> string
      //update error state with error title & message
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (> 0).',
      });
      return;
    }

    //call add user function from parent component (lift the state)
    props.onAddUser(enteredUsername, enteredAge);

    //clear input fields
    setEnteredUsername('');
    setEnteredAge('');
  };

  //when user input is changed
  const usernameChangeHandler = (event) => {
    //update state to input value
    setEnteredUsername(event.target.value);
  };

  //when age input is changed
  const ageChangeHandler = (event) => {
    //update state to input value
    setEnteredAge(event.target.value);
  };

  //clear error state when "Okay" button on modal or backdrop is clicked
  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {/*conditionally render error modal - render modal if error is defined*/}
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={enteredUsername}
            onChange={usernameChangeHandler}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            value={enteredAge}
            onChange={ageChangeHandler}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
