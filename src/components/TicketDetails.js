import React from 'react';
import { Button, Col, Row, Container, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Moment from 'react-moment';
import Loader from './ui/Loader';
import Message from './ui/Message';
import NewTicketModal from './NewTicketModal';
import EditTicketModal from './EditTicketModal';
import NewNoteModal from './NewNoteModal';
import EditNoteModal from './EditNoteModal';
import moment from 'moment';
import { listTicketDetails } from '../actions/ticketActions';
import DeleteNote from './DeleteNote';
import DeleteTicket from './DeleteTicket';

const TicketDetails = () => {
  const ticketDetails = useSelector((state) => state.ticketDetails);
  const { loading, error, currentTicket } = ticketDetails;

  const authActions = useSelector((state) => state.login);
  const { user } = authActions;

  // needed to get tech first name and last time
  const techList = useSelector((state) => state.techList);
  const { techs } = techList;

  if (currentTicket) {
    var techInfo = techs.find(({ _id }) => _id === currentTicket.tech);
    var reportedInfo = techs.find(
      ({ _id }) => _id === currentTicket.reportedBy
    );
  }

  const dispatch = useDispatch();

  const clearTicket = () => {
    dispatch(listTicketDetails(null));
  };

  return (
    <>
      <Row className='headRow '>
        <Col>
          {currentTicket === null ? (
            <>
              <Row>
                <Col xs='auto'>
                  <NewTicketModal />{' '}
                  <span style={{ color: 'white' }}>
                    No ticket currently selected...
                  </span>
                </Col>
              </Row>
            </>
          ) : (
            <>
              <Row>
                <Col xs='auto'>
                  <Button
                    variant='outline-danger'
                    size='sm'
                    onClick={clearTicket}
                  >
                    Clear Current Ticket
                  </Button>
                </Col>
                <Col xs='auto'>
                  <EditTicketModal ticket={currentTicket} />
                </Col>
                {user.isAdmin ? (
                  <Col>
                    <DeleteTicket ticket={currentTicket} />
                  </Col>
                ) : (
                  ''
                )}
              </Row>
            </>
          )}
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          {currentTicket === null ? (
            <>
              <Row className='px-4 py-2' style={{ color: 'black' }}>
                <Container
                  style={{
                    fontSize: '300px',
                    textAlign: 'center',
                  }}
                >
                  <i className='far fa-file-alt nullTicketBG'></i>
                </Container>
              </Row>
            </>
          ) : (
            <Row className='px-4 py-2 scrollable ticketDetailsColor'>
              <Table
                striped
                responsive='sm'
                size='sm'
                style={{ color: '#000' }}
              >
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ color: '#000' }}>
                    <td>
                      <h5>Ticket ID: </h5>
                      {currentTicket._id}
                    </td>

                    <td>
                      <h5>Date:</h5>
                      <Moment format='MM/DD/YYYY - hh:mm:ss A'>
                        {currentTicket.createdAt}
                      </Moment>
                    </td>
                    <td>
                      <h5>Priority:</h5>
                      {currentTicket.priority}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <h5>Client Name:</h5>
                      {currentTicket.firstName} {currentTicket.lastName}
                    </td>
                    <td>
                      <h5>Department:</h5>
                      {currentTicket.department}
                    </td>
                    <td>
                      <h5>Status:</h5>
                      {currentTicket.status}
                    </td>
                  </tr>

                  <tr style={{ color: '#000' }}>
                    <td>
                      <h5>Email:</h5>
                      {currentTicket.email}
                    </td>
                    <td>
                      <h5>Location: </h5>
                      {currentTicket.location}
                    </td>
                    <td>
                      <h5>Tech Assigned:</h5>
                      {(techInfo &&
                        `${techInfo.firstName} ${techInfo.lastName}`) ||
                        'Not Assigned'}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <h5>Phone:</h5>
                      {currentTicket.phone}
                    </td>
                    <td>
                      <h5>Building:</h5>
                      {currentTicket.building}
                    </td>
                    <td></td>
                  </tr>

                  <tr style={{ color: '#000' }}>
                    <td>
                      <h5>Reported By:</h5>
                      {`${reportedInfo.firstName} ${reportedInfo.lastName}`}
                    </td>
                    <td>
                      <h5>Category:</h5>
                      {currentTicket.category}
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </Table>
              <div className='ticketDescription'>
                <Table responsive='lg' size='lg'>
                  <thead>
                    <tr>
                      <th>
                        <h5>Description:</h5>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ color: 'black' }}>
                        {currentTicket.description}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              <Row className='py-1 ticketDetailsHeader'>
                <Col>Notes</Col>
                <NewNoteModal ticket={currentTicket} />
              </Row>
              {currentTicket.notes.length > 0 ? (
                <Row className='noteRow py-1 px-4 noteScrollable '>
                  {currentTicket.notes
                    .slice(0)
                    .reverse()
                    .map((note, i) => (
                      <div key={note._id}>
                        <Row className=' py-1'>
                          <Col>
                            <h6>
                              Note {currentTicket.notes.length - i} of{' '}
                              {currentTicket.notes.length} by {note.submittedBy}{' '}
                            </h6>
                            {note.edited ? (
                              <div style={{ fontStyle: 'italic' }}>
                                (edited at{' '}
                                {moment(note.updatedAt).format(
                                  'MM/DD/YYYY - hh:mm a'
                                )}
                                )
                              </div>
                            ) : (
                              <div>
                                created at{' '}
                                {moment(note.createdAt).format(
                                  'MM/DD/YYYY - hh:mm a'
                                )}
                              </div>
                            )}
                          </Col>
                          {note.techId === user._id || user.isAdmin ? (
                            <Col xs='auto'>
                              <EditNoteModal
                                ticket={currentTicket}
                                note={note}
                              />{' '}
                              <DeleteNote ticket={currentTicket} note={note} />
                            </Col>
                          ) : (
                            ''
                          )}
                        </Row>
                        <Row
                          className='noteRow py-2 px-5'
                          style={{
                            color: 'black',
                            marginBottom: '5px',
                          }}
                        >
                          <div>{note.noteDescription}</div>
                        </Row>
                      </div>
                    ))}
                </Row>
              ) : (
                'No notes found'
              )}

              <Row
                className='py-1 px-4 ticketDetailsHeader'
                // style={{ backgroundColor: 'rgb(185, 235, 245)' }}
              >
                Ticket History
              </Row>
              <Row className='historyScrollable '>
                {currentTicket.ticketHistory
                  .slice(0)
                  .reverse()
                  .map((item, i) => {
                    return (
                      <Row key={i} className='historyRow '>
                        {item}
                      </Row>
                    );
                  })}
              </Row>
            </Row>
          )}
        </>
      )}
    </>
  );
};

export default TicketDetails;
