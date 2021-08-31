import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  Container,
  Button,
  Popover,
  Tooltip,
  OverlayTrigger,
} from 'react-bootstrap';
import { listTicketDetails } from '../actions/ticketActions';

const Ticket = ({ ticket }) => {
  const {
    priority,
    _id,
    firstName,
    lastName,
    tech,
    description,
    notes,
    createdAt,
    updatedAt,
    email,
    phone,
    status,
  } = ticket;
  const ticketDetails = useSelector((state) => state.ticketDetails);
  const { currentTicket } = ticketDetails;

  // needed to get tech first name and last time
  const techList = useSelector((state) => state.techList);
  const { techs } = techList;

  // used for displaying notes
  const lastNote = notes.length - 1;
  const displayNote = notes[lastNote];

  const dispatch = useDispatch();

  const toDetails = () => {
    dispatch(listTicketDetails(_id));
  };

  // gets the info for the "tech" value passed with the ticket.
  // the tech value is the _id of the tech, this matches it with the tech list
  const techInfo = techs.find(({ _id }) => _id === tech);

  const howOld = moment(createdAt).fromNow();
  const ticketLastUpdated = moment(updatedAt).fromNow();
  const renderHowOld = (props) => (
    <Tooltip {...props}>
      Created {howOld}
      <br />
      Updated {ticketLastUpdated}
    </Tooltip>
  );
  const renderPriority = (props) => (
    <Tooltip {...props}>{priority} Priority</Tooltip>
  );

  return (
    <Container
      style={
        status === 'Closed' || status === 'Resolved'
          ? {
              backgroundColor: 'lightgray',
              border: '2px groove #000',
            }
          : {}
      }
    >
      <Row
        className={
          currentTicket && currentTicket._id === ticket._id
            ? 'activeTicket'
            : 'bottomBorder'
        }
      >
        {status === 'Closed' || status === 'Resolved' ? (
          <Row>
            <strong>{status.toUpperCase()}</strong>
          </Row>
        ) : (
          ''
        )}
        <Col>
          <OverlayTrigger
            placement='bottom'
            delay={{ show: 100, hide: 700 }}
            overlay={renderHowOld}
          >
            <i className='far fa-clock'>
              <span className='fixFAS'>
                {' '}
                <Moment format='MM/DD/YY h:mm A'>{createdAt}</Moment>{' '}
              </span>
            </i>
          </OverlayTrigger>
        </Col>
        <Col>
          <OverlayTrigger
            trigger='click'
            placement={'bottom'}
            overlay={
              <Popover>
                <Popover.Header as='h1'>{`Contact info for ${firstName} ${lastName}`}</Popover.Header>
                <Popover.Body style={{ fontSize: '16px' }}>
                  <strong>
                    <i className='far fa-envelope'></i>
                  </strong>{' '}
                  {email} <br />
                  <strong>
                    <i className='fas fa-phone-alt'></i>
                  </strong>{' '}
                  {phone}
                </Popover.Body>
              </Popover>
            }
          >
            <i className='fas fa-caret-down'>
              {' '}
              <span className='fixFAS'>
                {lastName}, {firstName}
              </span>
            </i>
          </OverlayTrigger>{' '}
        </Col>
        <Col className='ms-auto'>
          {techInfo ? (
            <>
              <OverlayTrigger
                trigger='click'
                placement={'bottom'}
                overlay={
                  <Popover>
                    <Popover.Header as='h1'>{`${techInfo.firstName} ${techInfo.lastName}`}</Popover.Header>
                    <Popover.Body style={{ fontSize: '16px' }}>
                      <strong>
                        <i className='far fa-envelope'></i>
                      </strong>{' '}
                      {techInfo.email}
                    </Popover.Body>
                  </Popover>
                }
              >
                <center>
                  <i className='far fa-user-circle'>
                    <span className='fixFAS'>
                      {' '}
                      {techInfo.firstName} {techInfo.lastName}
                    </span>
                  </i>
                </center>
              </OverlayTrigger>
            </>
          ) : (
            ''
          )}
        </Col>
        <Col>
          <div className='' align='center'>
            <OverlayTrigger
              placement='left'
              delay={{ show: 0, hide: 0 }}
              overlay={renderPriority}
              style={{ backgroundColor: '#fff', color: '#000' }}
            >
              <Button
                variant={
                  priority === 'High'
                    ? 'outline-danger'
                    : priority === 'Medium'
                    ? 'outline-warning'
                    : 'outline-success'
                }
                size='sm'
                className='px-1 mx-auto'
                onClick={toDetails}
              >
                Load Details
              </Button>
            </OverlayTrigger>
          </div>
        </Col>
        <Col xs={1}>
          {' '}
          {currentTicket && currentTicket._id === ticket._id ? (
            <i className='fas fa-arrow-right'></i>
          ) : (
            ''
          )}
        </Col>
      </Row>
      <Row className='bottomBorder'>Description: {description}</Row>
      {/* Logic to display any notes */}
      {notes.length > 0 ? (
        <>
          <Row className='noteRow'>
            Latest note of {notes.length} - by {displayNote.submittedBy} on{' '}
            {moment(displayNote.updatedAt).format('MM/DD/YYYY - hh:mm a')}
          </Row>
          <Row className='noteRow'>{displayNote.noteDescription}</Row>
        </>
      ) : (
        ''
      )}
    </Container>
  );
};

export default Ticket;
