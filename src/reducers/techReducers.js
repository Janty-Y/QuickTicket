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

// gets all techs
export const techListReducer = (state = { techs: [] }, action) => {
  switch (action.type) {
    case TECH_LIST_REQUEST:
      return { loading: true, techs: [] };
    case TECH_LIST_SUCCESS:
      return { loading: false, techs: action.payload };
    case TECH_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const techDetailsReducer = (state = { currentTech: null }, action) => {
  switch (action.type) {
    case TECH_DETAILS_REQUEST:
      return { loading: true, ...state };
    case TECH_DETAILS_SUCCESS:
      return { loading: false, currentTech: action.payload };
    case TECH_DETAILS_RESET:
      return { loading: false, currentTech: null };
    case TECH_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// edits the ticketsAssigned on the backend to add a ticket to a specific tech
export const techAssignReducer = (state = {}, action) => {
  switch (action.type) {
    case TECH_ASSIGN_REQUEST:
      return { loading: true };
    case TECH_ASSIGN_SUCCESS:
      return { loading: false, assign: action.payload };
    case TECH_ASSIGN_RESET:
      return { loading: false, assign: null };
    case TECH_ASSIGN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
