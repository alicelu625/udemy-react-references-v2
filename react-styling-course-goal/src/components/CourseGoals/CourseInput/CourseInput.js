import React, { useState } from 'react';

import Button from '../../UI/Button/Button';
import styles from './CourseInput.module.css';

/*Styled Components & dynamic props
import styled from 'styled-components';

const FormControl = styled.div`
  margin: 0.5rem 0;

  & label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
    color: ${props => (props.invalid ? 'red' : 'black')};
  }

  & input {
    display: block;
    width: 100%;
    //using dynamic props
    //border: 1px solid ${props => (props.invalid ? 'red' : '#ccc')};
    //background: ${props => (props.invalid ? '#ffd7d7' : 'transparent')};
    border: 1px solid #ccc;
    font: inherit;
    line-height: 1.5rem;
    padding: 0 0.25rem;
  }

  & input:focus {
    outline: none;
    background: #fad0ec;
    border-color: #8b005d;
  }

  //remove if using dynamic props
  &.invalid input {
    border-color: red;
    background: #ffd7d7;
  }

  //remove if using dynamic props
  &.invalid label {
    color: red;
  }
`;
*/

const CourseInput = props => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  const goalInputChangeHandler = event => {
    //reset input validity once input length > 0
    if (event.target.value.trim().length > 0) {
      setIsValid(true);
    }
    setEnteredValue(event.target.value);
  };

  const formSubmitHandler = event => {
    event.preventDefault();
    //if user input is blank, update state & return
    if (enteredValue.trim().length === 0) {
      setIsValid(false);
      return;
    }
    props.onAddGoal(enteredValue);
  };

  return (
    <form onSubmit={formSubmitHandler}>
      {/*Set CSS classes dynamically, if !isValid -> className='form-control invalid', else -> className='form-control'
      <div className={`form-control ${!isValid ? 'invalid' : ''}`}>
      */}
      
      {/*Using Styled Components, replace div with
      <FormControl className={!isValid && 'invalid'}>
      OR
      //Use with dynamic props
      <FormControl invalid={!isValid}>
      */}

      {/*Dynamic styling with CSS Modules & backticks string construction*/}
      <div
        className={`${styles['form-control']} ${!isValid && styles.invalid}`}
      >
        <label>Course Goal</label>
        {/*Dynamic inline style example - if not valid -> red, otherwise -> black
        <input 
          style={{
            borderColor: !isValid ? 'red' : 'black', 
            background: !isValid ? 'salmon' : 'transparent'
          }} 
          type="text" 
          onChange={goalInputChangeHandler}
        />
        */}
        <input type="text" onChange={goalInputChangeHandler} />
      </div>
      <Button type="submit">Add Goal</Button>
    </form>
  );
};

export default CourseInput;
