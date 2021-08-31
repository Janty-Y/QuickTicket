import {
  TICKET_SEARCH_REQUEST,
  TICKET_SEARCH_SUCCESS,
  TICKET_SEARCH_FAIL,
  TICKET_CLEAR_SEARCH,
} from '../constants/searchConstants';

export const searchTicketsReducer = (
  state = { results: null, success: false },
  action
) => {
  switch (action.type) {
    case TICKET_SEARCH_REQUEST:
      return { loading: true };
    case TICKET_SEARCH_SUCCESS:
      return { loading: false, success: true, results: action.payload };
    case TICKET_CLEAR_SEARCH:
      return { loading: false, results: null, success: false };
    case TICKET_SEARCH_FAIL:
      return { loading: false, results: null, error: action.payload };
    default:
      return state;
  }
};
