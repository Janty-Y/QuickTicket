import axios from 'axios';
import {
  TICKET_LIST_REQUEST,
  TICKET_LIST_SUCCESS,
  TICKET_LIST_FAIL,
  TICKET_LIST_CLEAR,
  TICKET_DETAILS_REQUEST,
  TICKET_DETAILS_SUCCESS,
  TICKET_DETAILS_FAIL,
  TICKET_CLEAR_CURRENT,
  TICKET_CREATE_REQUEST,
  TICKET_CREATE_SUCCESS,
  TICKET_CREATE_FAIL,
  TICKET_CREATE_RESET,
  TICKET_CREATE_DISABLE_REFRESH,
  TICKET_SEARCH_DISABLE_REFRESH,
  TICKET_EDIT_REQUEST,
  TICKET_EDIT_SUCCESS,
  TICKET_EDIT_RESET,
  TICKET_EDIT_FAIL,
  TICKET_FILL_MYTICKETS_REQUEST,
  TICKET_FILL_MYTICKETS_SUCCESS,
  TICKET_FILL_MYTICKETS_FAIL,
  TICKET_FILL_MYTICKETS_CLEAR,
  MY_TICKET_STATUS,
  TICKET_DELETE_REQUEST,
  TICKET_DELETE_SUCCESS,
  TICKET_DELETE_FAIL,
  TICKET_DELETE_RESET,
} from '../constants/ticketConstants';

// fetch all tickets
export const listTickets = () => async (dispatch) => {
  try {
    dispatch({ type: TICKET_LIST_REQUEST });

    const { data } = await axios.get('/api/tickets');

    dispatch({
      type: TICKET_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TICKET_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//  grab user's tickets and load them into an array of tickets into state
export const fillMyTickets = (id) => async (dispatch) => {
  try {
    dispatch({ type: TICKET_FILL_MYTICKETS_REQUEST });

    const { data } = await axios.get(`/api/tickets/${id}`);

    dispatch({
      type: TICKET_FILL_MYTICKETS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TICKET_FILL_MYTICKETS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// clears the ticket list on left side of page
export const clearTicketList = (dispatch) => {
  dispatch({
    type: TICKET_LIST_CLEAR,
  });
};

/* fetch the details for a specific ticket by ID
 used to fill currentTicket - ticket details will use this value from state to 
 load the details in the right-hand portion of the screen and influence other components*/
export const listTicketDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: TICKET_DETAILS_REQUEST });

    if (id !== null) {
      const { data } = await axios.get(`/api/tickets/${id}`);

      dispatch({
        type: TICKET_DETAILS_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: TICKET_CLEAR_CURRENT,
        payload: null,
      });
    }
  } catch (error) {
    dispatch({
      type: TICKET_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// create a new ticket
export const createTicket = (ticket) => async (dispatch) => {
  try {
    dispatch({
      type: TICKET_CREATE_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/tickets', ticket, config);

    dispatch({
      type: TICKET_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TICKET_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const toggleRefreshNewTicket = (refreshStatus) => (dispatch) => {
  dispatch({
    type: TICKET_CREATE_DISABLE_REFRESH,
    payload: refreshStatus,
  });
};

export const toggleRefreshSearchTicket = (refreshStatus) => (dispatch) => {
  dispatch({
    type: TICKET_SEARCH_DISABLE_REFRESH,
    payload: refreshStatus,
  });
};

export const toggleMyTicketStatus = (activeStatus) => (dispatch) => {
  dispatch({
    type: MY_TICKET_STATUS,
    payload: activeStatus,
  });
};

// clears state for createTicket after a ticket is created
export const clearCreateTicket = (dispatch) => {
  dispatch({
    type: TICKET_CREATE_RESET,
  });
};

// edit ticket
export const editTicket = (ticket) => async (dispatch) => {
  try {
    dispatch({
      type: TICKET_EDIT_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(
      `/api/tickets/${ticket._id}`,
      ticket,
      config
    );

    dispatch({
      type: TICKET_EDIT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TICKET_EDIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// clears state for editTicket after a ticket is updated
export const clearEditTicket = (dispatch) => {
  dispatch({
    type: TICKET_EDIT_RESET,
  });
};

// used for the myTickets functionality - takes in the array of ticket objects and sets
// it to the list to be displayed
export const setTicketList = (updatedTicketList) => async (dispatch) => {
  await dispatch({
    type: TICKET_LIST_SUCCESS,
    payload: updatedTicketList,
  });
};

export const clearMyTicketList = (dispatch) => {
  dispatch({
    type: TICKET_FILL_MYTICKETS_CLEAR,
  });
};

// delete a ticket - only available to admins
export const deleteTicket = (id) => async (dispatch) => {
  try {
    dispatch({ type: TICKET_DELETE_REQUEST });

    await axios.delete(`/api/tickets/${id}`);

    dispatch({
      type: TICKET_DELETE_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: TICKET_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const clearDeleteState = (dispatch) => {
  dispatch({
    type: TICKET_DELETE_RESET,
  });
};
