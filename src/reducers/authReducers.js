import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from '../constants/authConstants';

export const loginReducer = (
  state = {
    user: null,
    isAuthenticated: null,
    token: localStorage.getItem('token'),
  },
  action
) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case LOGIN_REQUEST:
      return { loading: true };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return { ...action.payload, isAuthenticated: true, loading: false };
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return { ...state, error: null };
    default:
      return state;
  }
};
