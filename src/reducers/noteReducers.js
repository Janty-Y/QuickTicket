import {
  NOTE_REQUEST,
  NOTE_SUCCESS,
  NOTE_FAIL,
  NOTE_RESET,
} from '../constants/noteConstants';

// handles both create and edit for notes
export const noteReducer = (state = { note: null, success: false }, action) => {
  switch (action.type) {
    case NOTE_REQUEST:
      return { loading: true, ...state };
    case NOTE_SUCCESS:
      return { loading: false, success: true, note: action.payload };
    case NOTE_RESET:
      return { loading: false, note: null, success: false };
    case NOTE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
