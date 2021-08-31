import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import {
  listTickets,
  setTicketList,
  listTicketDetails,
  clearTicketList,
  clearMyTicketList,
  toggleRefreshSearchTicket,
  toggleMyTicketStatus,
} from '../../actions/ticketActions';

import Refresher from './Refresher';

const Header = () => {
  const authActions = useSelector((state) => state.login);
  const { isAuthenticated, user } = authActions;

  const myTicketList = useSelector((state) => state.myTicketList);
  const { myTickets } = myTicketList;

  const dispatch = useDispatch();

  const logoutAction = () => {
    dispatch(toggleRefreshSearchTicket(false));
    dispatch(clearTicketList);
    dispatch(clearMyTicketList);
    dispatch(listTicketDetails(null));
    dispatch(logoutUser);
  };

  const goHome = () => {
    dispatch(toggleRefreshSearchTicket(false));
    dispatch(toggleMyTicketStatus(false));
    dispatch(listTickets());
    dispatch(listTicketDetails(null));
  };

  const listMyTickets = () => {
    dispatch(toggleRefreshSearchTicket(false));
    dispatch(toggleMyTicketStatus(true));

    if (user && user.ticketsAssigned.length > 0) {
      dispatch(setTicketList(myTickets));
    } else {
      dispatch(listTickets());
    }
  };

  const searchOption = () => {
    dispatch(setTicketList(null));
    dispatch(toggleRefreshSearchTicket(true));
    dispatch(toggleMyTicketStatus(false));
  };

  const authLinks = (
    <>
      <LinkContainer to='/' onClick={logoutAction}>
        <Nav.Link>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'>Logout</span>
        </Nav.Link>
      </LinkContainer>
    </>
  );

  const showHello = (
    <>
      {useLocation().pathname === '/' ? (
        <>
          <div style={{ color: '#fff' }}>
            | {user && `${user.firstName}  ${user.lastName}`}
          </div>
          <LinkContainer
            to=''
            style={{ color: '#fff' }}
            onClick={listMyTickets}
          >
            <Nav.Link>
              | My Tickets - {user && user.ticketsAssigned.length}
            </Nav.Link>
          </LinkContainer>
          |
          <LinkContainer to='' onClick={searchOption}>
            <Nav.Link>
              <span style={{ color: 'white' }}>
                <i className='fas fa-search'></i> Search
              </span>
            </Nav.Link>
          </LinkContainer>
          <Refresher />
        </>
      ) : (
        ''
      )}
    </>
  );

  const loginLink = (
    <>
      <LinkContainer to='/login'>
        <Nav.Link>
          <i className='fas fa-user'></i>{' '}
          <span className='hide-sm'> Login</span>
        </Nav.Link>
      </LinkContainer>
    </>
  );

  return (
    <header>
      <Navbar
        bg='dark'
        variant='dark'
        expand='lg'
        collapseOnSelect
        className='px-5'
        style={{ color: 'white' }}
      >
        <LinkContainer to='/' onClick={goHome}>
          <Navbar.Brand>
            <i className='fas fa-clipboard-list'></i> QuickTicket
          </Navbar.Brand>
        </LinkContainer>
        {isAuthenticated ? showHello : ''}
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto'>
            <LinkContainer to='/' onClick={goHome}>
              <Nav.Link>
                <i className='fas fa-home'></i> Home
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to='/about'>
              <Nav.Link>
                <i className='fas fa-question-circle'></i> About
              </Nav.Link>
            </LinkContainer>

            {isAuthenticated ? authLinks : loginLink}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
