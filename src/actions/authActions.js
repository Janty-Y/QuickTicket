import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from '../constants/authConstants';

// Load User
export const loadUser = async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/auth');
    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Login User
export const loginUser = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    const res = await axios.post('/api/auth', formData, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg,
    });
  }
};

// Logout
export const logoutUser = (dispatch) => {
  dispatch({ type: LOGOUT });
};

// Clear Errors
export const clearLoginErrors = (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
