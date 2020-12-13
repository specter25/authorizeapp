import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from './types';

import axios from 'axios';
import setAuthToken from '../util/setAuthToken';
// import { setAlert } from './alertactions';

//load user

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('http://localhost:5000/dashboard/profile');
    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (err) {
    const errors = err.errors;
    if (errors) {
      // errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }
    dispatch({ type: AUTH_ERROR });
  }
};

//register user

export const register = ({ name, email, password, type }) => async (
  dispatch,
) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password, type });
  try {
    const res = await axios.post(
      'http://localhost:5000/authentication/register',
      body,
      config,
    );
    console.log(res.data);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.errors;

    if (errors) {
      // errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      console.log(errors);
    }
    dispatch({ type: REGISTER_FAIL });
  }
};

//login user
export const login = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post(
      'http://localhost:5000/authentication/login',
      body,
      config,
    );

    dispatch({ type: LOGIN_SUCCESS, payload: res.data });

    dispatch(loadUser());
  } catch (err) {
    console.log(err.data);
    const errors = err.errors;
    if (errors) {
      console.log(errors);
      // errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({ type: LOGIN_FAIL });
  }
};

//logout user
export const logout = () => (dispatch) => {
  // dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
