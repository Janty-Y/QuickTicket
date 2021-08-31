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

export const ticketListReducer = (state = { tickets: [] }, action) => {
  switch (action.type) {
    case TICKET_LIST_REQUEST:
      return { loading: true, tickets: [] };
    case TICKET_LIST_SUCCESS:
      return { loading: false, tickets: action.payload };
    case TICKET_LIST_CLEAR:
      return { loading: false, tickets: [] };
    case TICKET_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const searchToggleReducer = (
  state = { isSearchActive: false },
  action
) => {
  switch (action.type) {
    case TICKET_SEARCH_DISABLE_REFRESH:
      return { isSearchActive: action.payload };
    default:
      return state;
  }
};

export const myTicketsReducer = (state = {}, action) => {
  switch (action.type) {
    case TICKET_FILL_MYTICKETS_REQUEST:
      return { loading: true, myTickets: [] };
    case TICKET_FILL_MYTICKETS_SUCCESS:
      return {
        loading: false,
        ...state,
        myTickets: [...state.myTickets, action.payload],
      };
    case TICKET_FILL_MYTICKETS_FAIL:
      return { loading: false, error: action.payload };
    case TICKET_FILL_MYTICKETS_CLEAR:
      return { loading: false, myTickets: [] };
    default:
      return state;
  }
};

export const myTicketToggleReducer = (
  state = { isMyTicketActive: false },
  action
) => {
  switch (action.type) {
    case MY_TICKET_STATUS:
      return { isMyTicketActive: action.payload };
    default:
      return state;
  }
};

export const ticketDetailsReducer = (
  state = { currentTicket: null },
  action
) => {
  switch (action.type) {
    case TICKET_DETAILS_REQUEST:
      return { loading: true, ...state };
    case TICKET_DETAILS_SUCCESS:
      return { loading: false, currentTicket: action.payload };
    case TICKET_CLEAR_CURRENT:
      return { loading: false, currentTicket: null };
    case TICKET_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const ticketCreateReducer = (
  state = { isNewTicketActive: false },
  action
) => {
  switch (action.type) {
    case TICKET_CREATE_DISABLE_REFRESH:
      return { isNewTicketActive: action.payload };
    case TICKET_CREATE_REQUEST:
      return { loading: true, ...state };
    case TICKET_CREATE_SUCCESS:
      return {
        loading: false,
        ticket: action.payload,
        isNewTicketActive: false,
      };
    case TICKET_CREATE_RESET:
      return { loading: false, ticket: null, isNewTicketActive: false };
    case TICKET_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const ticketEditReducer = (
  state = { ticket: null, success: false },
  action
) => {
  switch (action.type) {
    case TICKET_EDIT_REQUEST:
      return { loading: true };
    case TICKET_EDIT_SUCCESS:
      return { loading: false, success: true, ticket: action.payload };
    case TICKET_EDIT_RESET:
      return { loading: false, success: false, ticket: null };
    case TICKET_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// admin only
export const ticketeDeleteReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case TICKET_DELETE_REQUEST:
      return { loading: true };
    case TICKET_DELETE_SUCCESS:
      return { loading: false, success: true };
    case TICKET_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case TICKET_DELETE_RESET:
      return { loading: false, success: false };
    default:
      return state;
  }
};
