import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import {
  listTickets,
  toggleRefreshSearchTicket,
} from '../../actions/ticketActions';
import { loadUser } from '../../actions/authActions';

const Refresher = () => {
  const dispatch = useDispatch();

  const ticketCreate = useSelector((state) => state.ticketCreate);
  const { isNewTicketActive } = ticketCreate;

  const ticketDetails = useSelector((state) => state.ticketDetails);
  const { currentTicket } = ticketDetails;

  const searchToggle = useSelector((state) => state.searchToggle);
  const { isSearchActive } = searchToggle;

  const [customInterval, setCustomInterval] = useState(60000);

  useEffect(() => {
    if (!isNewTicketActive && currentTicket === null && !isSearchActive) {
      const timer = setInterval(() => {
        dispatch(listTickets());
        dispatch(loadUser);
      }, customInterval);
      return () => {
        clearInterval(timer);
      };
    }
  }, [
    dispatch,
    customInterval,
    currentTicket,
    isNewTicketActive,
    isSearchActive,
  ]);

  const handleRefresh = () => {
    dispatch(toggleRefreshSearchTicket(false));
    dispatch(listTickets());
    // loadUser will refresh the My Ticket count in the top
    dispatch(loadUser);
  };

  return (
    <>
      {!isNewTicketActive && currentTicket === null && !isSearchActive ? (
        <>
          <div style={{ color: 'white', fontSize: '16px' }}>Refresh</div>
          <div>
            <Form.Select
              size='sm'
              value={customInterval}
              onChange={(e) => setCustomInterval(Number(e.target.value))}
              // will be greyed out while a user is viewing ticket details
              disabled={currentTicket || isNewTicketActive}
            >
              <option value='60000'>1 minute </option>
              <option value='180000'>3 minutes </option>
              <option value='300000'>5 minutes </option>
              <option value='600000'>10 minutes </option>
            </Form.Select>
          </div>
          <Button
            variant='nothing'
            size='sm'
            style={{ color: 'white' }}
            onClick={handleRefresh}
          >
            <i className='fas fa-sync'></i>
          </Button>
        </>
      ) : (
        <div style={{ color: 'lightgray' }}> AutoRefresh Disabled</div>
      )}
    </>
  );
};

export default Refresher;
