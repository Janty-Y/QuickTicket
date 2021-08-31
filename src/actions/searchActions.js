import axios from 'axios';
import {
  TICKET_SEARCH_REQUEST,
  TICKET_SEARCH_SUCCESS,
  TICKET_SEARCH_FAIL,
  TICKET_CLEAR_SEARCH,
} from '../constants/searchConstants';

// search tickets based off of the searchParams object passed
export const ticketSearch = (searchParams) => async (dispatch) => {
  try {
    dispatch({ type: TICKET_SEARCH_REQUEST });

    if (searchParams.searchId) {
      const { data } = await axios.get(`/api/tickets/${searchParams.searchId}`);
      dispatch({
        type: TICKET_SEARCH_SUCCESS,
        payload: [data],
      });
    }

    if (searchParams.searchEmail) {
      const { data } = await axios.get('/api/tickets/', {
        params: {
          email: searchParams.searchEmail,
        },
      });
      dispatch({
        type: TICKET_SEARCH_SUCCESS,
        payload: data,
      });
    }
    if (searchParams.searchTechAssigned) {
      const { data } = await axios.get('/api/tickets/', {
        params: {
          tech: searchParams.searchTechAssigned,
        },
      });
      dispatch({
        type: TICKET_SEARCH_SUCCESS,
        payload: data,
      });
    }
    if (searchParams.searchReportedBy) {
      const { data } = await axios.get('/api/tickets/', {
        params: {
          reportedBy: searchParams.searchReportedBy,
        },
      });

      dispatch({
        type: TICKET_SEARCH_SUCCESS,
        payload: data,
      });
    }
    if (searchParams.searchClosed) {
      const { data } = await axios.get('/api/tickets/', {
        params: {
          status: ['Resolved', 'Closed'],
        },
      });

      dispatch({
        type: TICKET_SEARCH_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: TICKET_SEARCH_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg,
    });
  }
};

export const clearTicketSearch = (dispatch) => {
  dispatch({
    type: TICKET_CLEAR_SEARCH,
  });
};
