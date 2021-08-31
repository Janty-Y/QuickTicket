import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { ticketSearch, clearTicketSearch } from '../../actions/searchActions';
import TechOptions from '../ticketOptions/TechOptions';
import { setTicketList } from '../../actions/ticketActions';
import Message from './Message';

const SearchPanel = () => {
  const dispatch = useDispatch();

  const [searchId, setSearchId] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [searchTechAssigned, setSearchTechAssigned] = useState('Not Assigned');
  const [searchReportedBy, setSearchReportedBy] = useState('');

  const searchTickets = useSelector((state) => state.searchTickets);
  const { results, error } = searchTickets;

  useEffect(() => {
    // resets "results" back to null when the search panel is opened
    // also sets the ticketList using results from the state when updated
    dispatch(clearTicketSearch);
    if (results !== null) {
      dispatch(setTicketList(results));
    }
    // eslint-disable-next-line
  }, [results]);

  const searchIdHandler = () => {
    if (searchId !== '') {
      dispatch(ticketSearch({ searchId }));
    }
  };

  const searchEmailHandler = () => {
    if (searchEmail !== '') {
      dispatch(ticketSearch({ searchEmail }));
    }
  };

  const searchTechAssignedHandler = () => {
    dispatch(ticketSearch({ searchTechAssigned }));
  };

  const searchReportedByHandler = () => {
    if (searchReportedBy !== '') {
      dispatch(ticketSearch({ searchReportedBy }));
    }
  };

  const searchClosedHandler = () => {
    let searchClosed = true;
    dispatch(ticketSearch({ searchClosed }));
  };

  return (
    <>
      <div className='px-5'>
        <Container className='searchContainer aboutScrollable px-5'>
          <h3>
            <i className='fas fa-search'> </i>Search{' '}
          </h3>
          <br />
          <Row>
            <Col>
              <i className='fas fa-exclamation'></i> - Search results include
              tickets that are marked Closed or Resolved
            </Col>
          </Row>
          <br />

          {error ? (
            <Message variant='danger'>
              <i className='fas fa-exclamation-triangle'></i> {error}
            </Message>
          ) : (
            ''
          )}

          {/* ------------------ TECH ASSIGNED SEARCH --------------------- */}
          <Form>
            <Row className='g-2'>
              <Form.Group>
                <Form.Label>Tech Assigned</Form.Label>
                <Col>
                  <Form.Select
                    value={searchTechAssigned}
                    onChange={(e) => setSearchTechAssigned(e.target.value)}
                  >
                    <option value='Not Assigned'>Not Assigned</option>
                    <TechOptions />
                  </Form.Select>
                </Col>
              </Form.Group>

              <Button
                variant='outline-dark'
                size='sm'
                onClick={searchTechAssignedHandler}
              >
                Search Tech Assigned
              </Button>
            </Row>
          </Form>
          <br />

          {/* ------------------ ID SEARCH --------------------- */}
          <Form>
            <Row className='g-2'>
              <Col xs>
                <Form.Group>
                  <Form.Label>Ticket ID</Form.Label>
                  <Form.Control
                    size='lg'
                    required
                    type='text'
                    value={searchId}
                    placeholder='Enter Ticket ID'
                    onChange={(e) => setSearchId(e.target.value)}
                    onKeyPress={(e) => {
                      e.key === 'Enter' && e.preventDefault();
                    }}
                  />
                </Form.Group>
              </Col>

              <Button
                size='sm'
                variant='outline-dark'
                onClick={searchIdHandler}
              >
                Search Ticket ID
              </Button>
            </Row>
          </Form>
          <br />

          {/* ------------------ EMAIL SEARCH --------------------- */}
          <Form>
            <Row className='g-2'>
              <Col xs>
                <Form.Group>
                  <Form.Label>Client Email</Form.Label>
                  <Form.Control
                    size='lg'
                    required
                    type='text'
                    value={searchEmail}
                    placeholder='Enter Email Address'
                    onChange={(e) => setSearchEmail(e.target.value)}
                    onKeyPress={(e) => {
                      e.key === 'Enter' && e.preventDefault();
                    }}
                  />
                </Form.Group>
              </Col>

              <Button
                size='sm'
                variant='outline-dark'
                onClick={searchEmailHandler}
              >
                Search Email
              </Button>
            </Row>
          </Form>
          <br />

          {/* ------------------ REPORTED BY SEARCH --------------------- */}
          <Form>
            <Row className='g-2'>
              <Col xs>
                <Form.Group>
                  <Form.Label>Reported By</Form.Label>
                  <Form.Select
                    value={searchReportedBy}
                    onChange={(e) => setSearchReportedBy(e.target.value)}
                  >
                    <option value=''>Select</option>
                    <TechOptions />
                  </Form.Select>
                </Form.Group>
              </Col>

              {/* ------------------ CLOSED/RESOLVED SEARCH --------------------- */}

              <Button
                variant='outline-dark'
                size='sm'
                onClick={searchReportedByHandler}
              >
                Search Reported By
              </Button>
            </Row>
          </Form>
          <br />
          <br />
          <Form>
            <Form.Label>Find all Closed/Resolved</Form.Label>
            <Row className='g-2'>
              <Button
                variant='outline-dark'
                size='sm'
                onClick={searchClosedHandler}
              >
                Closed/Resolved Tickets
              </Button>
            </Row>
          </Form>
          <br />
          <br />
        </Container>
      </div>
    </>
  );
};

export default SearchPanel;
