import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Button } from 'react-bootstrap';
import Message from '../components/ui/Message';
import Loader from '../components/ui/Loader';
import Ticket from '../components/TicketItem';
import TicketDetails from '../components/TicketDetails';
import { listTickets, fillMyTickets } from '../actions/ticketActions';
import SearchPanel from '../components/ui/SearchPanel';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const ticketList = useSelector((state) => state.ticketList);
  const { loading, error, tickets } = ticketList;

  const authActions = useSelector((state) => state.login);
  const { user } = authActions;

  const searchToggle = useSelector((state) => state.searchToggle);
  const { isSearchActive } = searchToggle;

  const myTicketToggle = useSelector((state) => state.myTicketToggle);
  const { isMyTicketActive } = myTicketToggle;

  const [closedTickets, setClosedTickets] = useState(false);

  useEffect(() => {
    // toggle to show all tickets (including closed/resolved) in search
    // initial state === false

    if (isSearchActive === true) {
      setClosedTickets(true);
    } else if (isMyTicketActive === true) {
      setClosedTickets(false);
      if (user) {
        user.ticketsAssigned.forEach((ticket) => {
          dispatch(fillMyTickets(ticket));
        });
      }
    } else {
      // will run so long as user is not on search panel
      setClosedTickets(false);
      dispatch(listTickets());
      if (user) {
        user.ticketsAssigned.forEach((ticket) => {
          dispatch(fillMyTickets(ticket));
        });
      }
    }
  }, [isMyTicketActive, isSearchActive, dispatch, user]);

  const displayHandler = () => {
    setClosedTickets(!closedTickets);
  };

  let colorCount = -1;

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row className='px-1' xs={2}>
          <Col className=' px-3'>
            <Row>
              <Row className='headRow' style={{ color: 'white' }}>
                <Col>Date</Col>
                <Col>Client</Col>
                <Col>Tech</Col>

                <Col xs='auto'>
                  {!isSearchActive ? (
                    <Button
                      variant='flush'
                      size='sm'
                      style={{
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: 'bold',
                      }}
                      onClick={displayHandler}
                    >
                      {!closedTickets ? 'Show Closed' : 'Hide Closed'}
                    </Button>
                  ) : (
                    'Showing All'
                  )}
                </Col>
              </Row>
            </Row>
            <Col className='scrollable'>
              {tickets ? (
                tickets
                  .slice(0)
                  .reverse()
                  .map((ticket, i) =>
                    ticket.status === 'Open' && !closedTickets ? (
                      <Row
                        key={ticket._id}
                        className={
                          colorCount++ % 2 === 0
                            ? `cycleGrey py-2 px-3`
                            : 'cycleBlue py-2 px-3'
                        }
                      >
                        <Ticket ticket={ticket} />
                      </Row>
                    ) : closedTickets ? (
                      <Row
                        key={ticket._id}
                        className={
                          i % 2 === 0
                            ? `cycleBlue py-2 px-3`
                            : 'cycleGrey py-2 px-3'
                        }
                      >
                        <Ticket ticket={ticket} />
                      </Row>
                    ) : (
                      ''
                    )
                  )
              ) : (
                <SearchPanel />
              )}
            </Col>
            <Row className='py-5'>
              <Col> </Col>
            </Row>
          </Col>

          <Col>
            <TicketDetails />
          </Col>
          <Row className='py-5'>
            <Col> </Col>
          </Row>
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
