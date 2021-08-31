import React, { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, Form, FloatingLabel } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import DepartmentOptions from './ticketOptions/DepartmentOptions';
import BuildingOptions from './ticketOptions/BuildingOptions';
import CategoryOptions from './ticketOptions/CategoryOptions';
import TechOptions from './ticketOptions/TechOptions';
import Message from './ui/Message';
import moment from 'moment';
import {
  createTicket,
  listTickets,
  listTicketDetails,
  clearCreateTicket,
  toggleRefreshNewTicket,
  toggleRefreshSearchTicket,
  toggleMyTicketStatus,
} from '../actions/ticketActions';
import { addToMyTickets, clearTechAssign } from '../actions/techActions';

const NewTicketModal = () => {
  const dispatch = useDispatch();

  const ticketCreate = useSelector((state) => state.ticketCreate);
  const { ticket, error } = ticketCreate;

  // used to set reportedBy and  for ticket history
  const authActions = useSelector((state) => state.login);
  const { user } = authActions;

  // used to add tech assigned to ticket history
  const techList = useSelector((state) => state.techList);
  const { techs } = techList;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [priority, setPriority] = useState('Low');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('N/A');
  const [location, setLocation] = useState('Main Campus');
  const [building, setBuilding] = useState('N/A');
  const [category, setCategory] = useState('N/A');
  const [status, setStatus] = useState('Open');
  const [tech, setTech] = useState('Not Assigned');
  const [description, setDiscription] = useState('');
  const [reportedBy, setReporter] = useState('');

  const [validated, setValidated] = useState(false);

  // handles if the new ticket modal is active or not
  const [show, setShow] = useState(false);
  const handleClose = () => {
    dispatch(toggleRefreshNewTicket(false));
    setShow(false);
  };
  const handleShow = () => {
    dispatch(toggleRefreshNewTicket(true));
    setShow(true);
  };

  // function to clear all fields, setting to default values
  const handleClear = () => {
    setFirstName('');
    setLastName('');
    setPriority('Low');
    setPhone('');
    setEmail('');
    setDepartment('');
    setLocation('Main Campus');
    setBuilding('');
    setCategory('');
    setStatus('Open');
    setTech('');
    setDiscription('');

    setValidated(false);
  };

  const onSubmit = (event) => {
    // used to timestamp the ticket history details
    const currentDate = moment(new Date()).format('MM/DD/YYYY - hh:mm a');

    const newTicket = {
      firstName,
      lastName,
      priority,
      phone,
      email,
      department,
      location,
      building,
      category,
      status,
      tech,
      description,
      reportedBy,
      ticketHistory: [
        `${currentDate} - Ticket Created by ${user.firstName} ${user.lastName}`,
      ],
    };

    const { ticketHistory } = newTicket;

    //  ----- BEGIN updating ticketHistory -----
    ticketHistory.push(
      `${currentDate} - Ticket marked ${status} by ${user.firstName} ${user.lastName}`
    );

    if (tech !== 'Not Assigned') {
      //finds info for tech by id
      const techInfo = techs.find(({ _id }) => _id === tech) || 'Not Assigned';

      ticketHistory.push(
        `${currentDate} - Ticket assigned to ${techInfo.firstName} ${techInfo.lastName} by ${user.firstName} ${user.lastName}`
      );
    }
    //  ----- END updating ticketHistory -----

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    dispatch(createTicket(newTicket));
  };

  // function to add ticket to the assigned tech's myTickets
  const ticketAssignHandler = () => {
    const assignTicketId = ticket._id;
    const assignTechId = tech;

    let removeFromList = false;

    // if the ticket is marked Closed or Resolved, this will not add it to the tech's ticketAssigned
    if (status === 'Closed' || status === 'Resolved') {
      removeFromList = true;
    }
    if (assignTechId !== 'Not Assigned') {
      dispatch(
        addToMyTickets({ assignTechId, assignTicketId, removeFromList })
      );
    }
    dispatch(clearTechAssign);
    // in the event that someone creates a new ticket while in their myTickets or in the search panel
    dispatch(toggleRefreshSearchTicket(false));
    dispatch(toggleMyTicketStatus(false));
  };

  const toQueue = () => {
    ticketAssignHandler();
    setShow(false);
    dispatch(listTickets());
    dispatch(clearCreateTicket);
  };

  const toDetails = () => {
    ticketAssignHandler();
    setShow(false);
    dispatch(listTickets());
    dispatch(listTicketDetails(ticket._id));
    dispatch(clearCreateTicket);
  };

  // sets user
  useEffect(() => {
    if (user) {
      setReporter(`${user._id}`);
    }
  }, [setReporter, user]);

  return (
    <>
      <Button variant='outline-info' size='sm' onClick={handleShow}>
        New Ticket
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
        size='xl'
        centered
      >
        <Modal.Header>
          <Modal.Title>Create a new ticket</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {ticket && ticket._id ? (
            ''
          ) : (
            <Form noValidate validated={validated}>
              <Row className='mb-3'>
                <Form.Group as={Col}>
                  <FloatingLabel label='First Name'>
                    <Form.Control
                      type='text'
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <Form.Control.Feedback type='invalid'>
                      Enter a first name.
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>

                <Form.Group as={Col}>
                  <FloatingLabel controlId='floatingInput' label='Last Name'>
                    <Form.Control
                      required
                      type='text'
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <Form.Control.Feedback type='invalid'>
                      Enter a last name.
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>

                <Form.Group as={Col}>
                  <FloatingLabel controlId='floatingSelect' label='Priority'>
                    <Form.Select
                      required
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                    >
                      <option value='Low'>Low</option>
                      <option value='Medium'>Medium</option>
                      <option value='High'>High</option>
                    </Form.Select>
                  </FloatingLabel>
                </Form.Group>
              </Row>

              <Row className='mb-3'>
                <Form.Group as={Col}>
                  <FloatingLabel controlId='floatingInput' label='Phone'>
                    <Form.Control
                      type='text'
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <Form.Control.Feedback type='invalid'>
                      Enter a phone number
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>

                <Form.Group as={Col}>
                  <FloatingLabel controlId='floatingInput' label='Email'>
                    <Form.Control
                      type='email'
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Control.Feedback type='invalid'>
                      Enter an email address
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>

                <Form.Group as={Col}>
                  <FloatingLabel
                    controlId='floatingSelect'
                    label='Department'
                    noValidate
                  >
                    <Form.Select
                      required
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                    >
                      <DepartmentOptions />
                    </Form.Select>
                  </FloatingLabel>
                </Form.Group>
              </Row>

              <Row className='mb-3'>
                <Form.Group as={Col}>
                  <FloatingLabel controlId='floatingSelect' label='Location'>
                    <Form.Select
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    >
                      <option value='Main Campus'>Main Campus</option>
                      <option value='Web Only'>Web Only</option>
                    </Form.Select>
                  </FloatingLabel>
                </Form.Group>

                <Form.Group as={Col}>
                  <FloatingLabel controlId='floatingSelect' label='Building'>
                    <Form.Select
                      required
                      value={building}
                      onChange={(e) => setBuilding(e.target.value)}
                    >
                      <BuildingOptions />
                    </Form.Select>
                  </FloatingLabel>
                </Form.Group>

                <Form.Group as={Col}>
                  <FloatingLabel controlId='floatingSelect' label='Category'>
                    <Form.Select
                      required
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <CategoryOptions />
                    </Form.Select>
                  </FloatingLabel>
                </Form.Group>
              </Row>

              <Row className='mb-5'>
                <Form.Group as={Col}>
                  <FloatingLabel controlId='floatingSelect' label='Status'>
                    <Form.Select
                      required
                      defaultValue={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value='Open'>Open</option>
                      <option value='Resolved'>Resolved</option>
                      <option value='Closed'>Closed</option>
                    </Form.Select>
                  </FloatingLabel>
                </Form.Group>

                <Form.Group as={Col}>
                  <FloatingLabel controlId='floatingSelect' label='Tech'>
                    <Form.Select
                      value={tech}
                      onChange={(e) => setTech(e.target.value)}
                    >
                      <option value='Not Assigned'>Not Assigned</option>
                      <TechOptions />
                    </Form.Select>
                  </FloatingLabel>
                </Form.Group>

                <Col></Col>
              </Row>

              <FloatingLabel controlId='floatingTextarea2' label='Description'>
                <Form.Control
                  as='textarea'
                  required
                  style={{ height: '200px' }}
                  value={description}
                  onChange={(e) => setDiscription(e.target.value)}
                />
                <Form.Control.Feedback type='invalid'>
                  Enter a description of the issue
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form>
          )}

          {/* ---- kicks an error to user if any fields are empty ----- */}
          {error ? (
            <Message variant='danger'>
              There was an error processing the ticket. Please check all fields
              and resubmit
            </Message>
          ) : (
            ''
          )}

          {/* ---- confirmation for a ticket being created ----  */}
          {ticket && ticket._id ? (
            <>
              <Message variant='success'>
                {' '}
                Ticket Created! <br />
                <br />
                <Button variant='outline-info' onClick={toQueue}>
                  Go Back to Queue
                </Button>
                <Button variant='outline-info' onClick={toDetails}>
                  View ticket details
                </Button>{' '}
              </Message>
            </>
          ) : (
            ''
          )}
        </Modal.Body>

        {/* ---- button layout for bottom of modal ----  */}
        <Modal.Footer>
          {ticket && ticket._id ? (
            ' '
          ) : (
            <>
              <Col>
                <Button variant='outline-danger' onClick={handleClear}>
                  Clear Form
                </Button>
              </Col>
              <Row className='d-grid gap-2'>
                <Button variant='success' onClick={onSubmit}>
                  Submit Ticket
                </Button>

                <Button variant='outline-dark' onClick={handleClose}>
                  Close
                </Button>
              </Row>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NewTicketModal;
