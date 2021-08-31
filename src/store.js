import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  ticketListReducer,
  ticketDetailsReducer,
  ticketCreateReducer,
  ticketEditReducer,
  myTicketsReducer,
  searchToggleReducer,
  myTicketToggleReducer,
  ticketeDeleteReducer,
} from './reducers/ticketReducers';
import { loginReducer } from './reducers/authReducers';
import {
  techListReducer,
  techDetailsReducer,
  techAssignReducer,
} from './reducers/techReducers';
import { noteReducer } from './reducers/noteReducers';
import { searchTicketsReducer } from './reducers/searchReducers';

const reducer = combineReducers({
  ticketList: ticketListReducer,
  myTicketList: myTicketsReducer,
  myTicketToggle: myTicketToggleReducer,
  ticketDetails: ticketDetailsReducer,
  ticketCreate: ticketCreateReducer,
  ticketEdit: ticketEditReducer,
  login: loginReducer, //auth reducers for login/report tracking
  techList: techListReducer,
  techDetails: techDetailsReducer,
  techAssign: techAssignReducer,
  noteHandler: noteReducer,
  searchToggle: searchToggleReducer,
  searchTickets: searchTicketsReducer,
  ticketDelete: ticketeDeleteReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
