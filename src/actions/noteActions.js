import axios from 'axios';
import {
  NOTE_REQUEST,
  NOTE_SUCCESS,
  NOTE_FAIL,
  NOTE_RESET,
} from '../constants/noteConstants';

// create and edit a note for a ticket
export const createNote = (newNote) => async (dispatch) => {
  try {
    dispatch({
      type: NOTE_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(
      `/api/tickets/${newNote.ticketId}`,
      newNote,
      config
    );

    dispatch({
      type: NOTE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NOTE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const resetNote = async (dispatch) => {
  dispatch({
    type: NOTE_RESET,
  });
};
