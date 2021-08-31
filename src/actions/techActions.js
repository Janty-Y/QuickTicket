import axios from 'axios';
import {
  TECH_LIST_REQUEST,
  TECH_LIST_SUCCESS,
  TECH_LIST_FAIL,
  TECH_ASSIGN_REQUEST,
  TECH_ASSIGN_SUCCESS,
  TECH_ASSIGN_RESET,
  TECH_ASSIGN_FAIL,
  TECH_DETAILS_REQUEST,
  TECH_DETAILS_SUCCESS,
  TECH_DETAILS_FAIL,
  TECH_DETAILS_RESET,
} from '../constants/techConstants';

// get all techs
export const listTechs = () => async (dispatch) => {
  try {
    dispatch({ type: TECH_LIST_REQUEST });

    const { data } = await axios.get('/api/techs');

    dispatch({
      type: TECH_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TECH_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// fetch the details for a specific tech by ID
export const listTechDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: TECH_DETAILS_REQUEST });

    if (id !== null) {
      const { data } = await axios.get(`/api/techs/${id}`);

      dispatch({
        type: TECH_DETAILS_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: TECH_DETAILS_RESET,
        payload: null,
      });
    }
  } catch (error) {
    dispatch({
      type: TECH_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// adds a ticket ID to the tech to show under 'My Tickets' by editing a tech's assigned tickets
export const addToMyTickets = (tech) => async (dispatch) => {
  try {
    dispatch({
      type: TECH_ASSIGN_REQUEST,
    });

    const { assignTechId, assignTicketId, removeFromList } = tech;

    await axios.put(`/api/techs/${assignTechId}`, {
      assignTicketId,
      removeFromList,
    });

    dispatch({
      type: TECH_ASSIGN_SUCCESS,
      payload: assignTicketId,
    });
  } catch (error) {
    dispatch({
      type: TECH_ASSIGN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// clears state for tech assign after a ticket is updated/created
export const clearTechAssign = (dispatch) => {
  dispatch({
    type: TECH_ASSIGN_RESET,
  });
};
