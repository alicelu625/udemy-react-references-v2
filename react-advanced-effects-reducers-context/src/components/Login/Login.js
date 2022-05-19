import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from 'react';

import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';
import classes from './Login.module.css';

/****************** Reducer functions ******************/
//can define reducer function outside of component function because it does not need to interact with anything inside
//email value & validation
const emailReducer = (state, action) => {
  //email input changes
  if (action.type === 'USER_INPUT') {
    //value from payload & check validity
    return { value: action.val, isValid: action.val.includes('@') };
  }
  //input field blurred (loses focus)
  if (action.type === 'INPUT_BLUR') {
    //value in state & check validity
    return { value: state.value, isValid: state.value.includes('@') };
  }
  return { value: '', isValid: false };
};

//password value & validation
const passwordReducer = (state, action) => {
  //password input changes
  if (action.type === 'USER_INPUT') {
    //value from payload & check validity
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  //input field blurred (loses focus)
  if (action.type === 'INPUT_BLUR') {
    //value in state & check validity
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: '', isValid: false };
};


/****************** Component ******************/
const Login = (props) => {
  /*replaced with use of Reducers
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  */
  const [formIsValid, setFormIsValid] = useState(false);


  /****************** Reducers ******************/
  //reducer for email
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null,
  });

  //reducer for password
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null,
  });

  
  const authCtx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  /* Test function
  //test side effect function
  useEffect(() => {
    console.log('EFFECT RUNNING');

    //can return cleanup function to run before the useEffect function re-runs
    return () => {
      console.log('EFFECT CLEANUP');
    };
  }, []);
  */


  /****************** Side effect function to check validity ******************/
  //use object destructuring to pull the isValid state into a constant (emailIsValid)
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  //will run if email or password validity changes
  useEffect(() => {
    //check validity when user pauses typing for 5s (so it's not ran every keystroke)
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
      //update state based on other states
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    //return must be a function
    //cleanup function - runs before useEffect executes function next time
    return () => {
      console.log('CLEANUP');
      //clear timer that was set in the last side effect function
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);


  /****************** Input change handlers ******************/
  //when email input changes
  const emailChangeHandler = (event) => {
    //dispatch function containing object with action identifier (type) & payload (value user entered)
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value });

    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.isValid
    // );
  };

  //when password input changes
  const passwordChangeHandler = (event) => {
    //dispatch function containing object with action identifier (type) & payload (value user entered)
    dispatchPassword({ type: 'USER_INPUT', val: event.target.value });

    // setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };


  /****************** Input blur handlers ******************/
  //when email input field blurs (loses focus, user clicks out)
  const validateEmailHandler = () => {
    //dispatch object
    dispatchEmail({ type: 'INPUT_BLUR' });
  };

  //when password input field blurs (loses focus, user clicks out)
  const validatePasswordHandler = () => {
    //dispatch object
    dispatchPassword({ type: 'INPUT_BLUR' });
  };

  /****************** Submit handler ******************/
  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
