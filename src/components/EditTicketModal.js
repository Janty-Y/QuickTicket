import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Row, Col, Form, FloatingLabel } from 'react-bootstrap';
import DepartmentOptions from './ticketOptions/DepartmentOptions';
import BuildingOptions from './ticketOptions/BuildingOptions';
import CategoryOptions from './ticketOptions/CategoryOptions';
import TechOptions from './ticketOptions/TechOptions';
import Message from './ui/Message';
import moment from 'moment';
import {
  editTicket,
  listTickets,
  listTicketDetails,
  clearEditTicket,
  toggleRefreshSearchTicket,
  toggleMyTicketStatus,
} from '../actions/ticketActions';
import { addToMyTickets, clearTechAssign } from '../actions/techActions';

const EditTicketModal = ({ ticket }) => {
  const dispatch = useDispatch();

  // getting information from ticket that was passed as prop
  const {
    _id,
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
    ticketHistory,
  } = ticket;

  const ticketEdit = useSelector((state) => state.ticketEdit);
  const { error, success } = ticketEdit;

  // used to add tech assigned to ticket history
  const techList = useSelector((state) => state.techList);
  const { techs } = techList;

  // used to set reportedBy and  for ticket history
  const authActions = useSelector((state) => state.login);
  const { user } = authActions;

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  const [edit_firstName, setFirstName] = useState(firstName);
  const [edit_lastName, setLastName] = useState(lastName);
  const [edit_priority, setPriority] = useState(priority);
  const [edit_phone, setPhone] = useState(phone);
  const [edit_email, setEmail] = useState(email);
  const [edit_department, setDepartment] = useState(department);
  const [edit_location, setLocation] = useState(location);
  const [edit_building, setBuilding] = useState(building);
  const [edit_category, setCategory] = useState(category);
  const [edit_status, setStatus] = useState(status);
  const [edit_tech, setTech] = useState(tech);
  const [edit_description, setDescription] = useState(description);

  // resets fields to what was initially passed via props
  const handleResetFields = () => {
    setFirstName(firstName);
    setLastName(lastName);
    setPriority(priority);
    setPhone(phone);
    setEmail(email);
    setDepartment(department);
    setLocation(location);
    setBuilding(building);
    setCategory(category);
    setStatus(status);
    setTech(tech);
    setDescription(description);
  };

  const loadTicket = () => {
    handleResetFields();
    setShow(true);
  };

  const saveChanges = () => {
    const edit_ticketHistory = [...ticketHistory];
    const currentDate = moment(new Date()).format('MM/DD/YYYY - hh:mm a');

    const assignTicketId = _id;
    let assignTechId;
    let removeFromList;

    // this will catch the initial tech that is reassigned - then it will remove the ticket from their ticketAssigned
    // will also update the ticket history showing reassignment
    if (edit_tech !== tech) {
      if (tech !== 'Not Assigned') {
        const techInfo = techs.find(({ _id }) => _id === tech);
        const newTechInfo = techs.find(
          ({ _id }) => edit_tech !== 'Not Assigned' && _id === edit_tech
        );
        // shows in ticket history - reassigns ticket from a tech to the newly assigned tech
        if (edit_tech !== 'Not Assigned') {
          edit_ticketHistory.push(
            `${currentDate} - ${user.firstName} ${user.lastName} reassigned ticket from ${techInfo.firstName} ${techInfo.lastName} to ${newTechInfo.firstName} ${newTechInfo.lastName}`
          );
        }
        // shows in ticket history - unassigns ticket from a tech to 'Not Assigned'
        else if (edit_tech === 'Not Assigned') {
          edit_ticketHistory.push(
            `${currentDate} - ${user.firstName} ${user.lastName} unassigned ticket from ${techInfo.firstName} ${techInfo.lastName}`
          );
        }
      }
      // shows in ticket history - assigns to a tech from 'Not Assigned'
      else {
        const newTechInfo = techs.find(({ _id }) => _id === edit_tech);
        edit_ticketHistory.push(
          `${currentDate} - ${user.firstName} ${user.lastName} assigned ticket to ${newTechInfo.firstName} ${newTechInfo.lastName}`
        );
      }

      // this removes the ticket from the original tech's myTickets
      assignTechId = tech;
      removeFromList = true;
      if (assignTechId !== 'Not Assigned') {
        dispatch(
          addToMyTickets({ assignTechId, assignTicketId, removeFromList })
        );
      }
    }

    assignTechId = edit_tech;

    // if the ticket is marked Closed or Resolved, this will remove it from the tech's ticketAssigned
    // also updates the tickey history
    if (edit_status === 'Closed' || edit_status === 'Resolved') {
      removeFromList = true;
      edit_ticketHistory.push(
        `${currentDate} - Ticket marked ${edit_status} by ${user.firstName} ${user.lastName}`
      );
    } else {
      removeFromList = false;
    }

    // will show history is a ticket is marked Open from a Closed/Resolved status
    if (
      status === 'Closed' ||
      (status === 'Resolved' && edit_status === 'Open')
    ) {
      edit_ticketHistory.push(
        `${currentDate} - Ticket marked ${edit_status} by ${user.firstName} ${user.lastName}`
      );
    }

    edit_ticketHistory.push(
      `${currentDate} - Ticket details edited by ${user.firstName} ${user.lastName}`
    );

    const updatedTicket = {
      _id,
      edit_firstName,
      edit_lastName,
      edit_priority,
      edit_phone,
      edit_email,
      edit_department,
      edit_location,
      edit_building,
      edit_category,
      edit_status,
      edit_tech,
      edit_description,
      edit_ticketHistory,
    };

    dispatch(editTicket(updatedTicket));
    if (edit_tech !== 'Not Assigned') {
      dispatch(
        addToMyTickets({ assignTechId, assignTicketId, removeFromList })
      );
    }
  };

  const toDetails = () => {
    setShow(false);
    dispatch(listTickets());
    dispatch(listTicketDetails(ticket._id));
    dispatch(clearEditTicket);
    dispatch(clearTechAssign);
    // in the event that someone edits a ticket while in their myTickets or in the search panel
    dispatch(toggleRefreshSearchTicket(false));
    dispatch(toggleMyTicketStatus(false));
  };

  return (
    <>
      <Button variant='outline-info' size='sm' onClick={loadTicket}>
        Edit Ticket
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
          <Modal.Title>Edit ticket # {_id}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {!success ? (
            <Form>
              <Row className='mb-3'>
                <Form.Group as={Col}>
                  <FloatingLabel label='First Name'>
                    <Form.Control
                      type='text'
                      required
                      value={edit_firstName}
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
                      value={edit_lastName}
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
                      value={edit_priority}
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
                      value={edit_phone}
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
                      value={edit_email}
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
                      value={edit_department}
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
                      value={edit_location}
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
                      value={edit_building}
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
                      value={edit_category}
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
                      defaultValue={edit_status}
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
                      value={edit_tech}
                      onChange={(e) => setTech(e.target.value)}
                    >
                      <option value='Not Assigned'>Not Assigned</option>
                      <TechOptions />
                    </Form.Select>
                  </FloatingLabel>
                </Form.Group>

                <Col></Col>
              </Row>

              <FloatingLabel controlId='floatingTextarea2' label='Description:'>
                <Form.Control
                  as='textarea'
                  required
                  style={{ height: '200px' }}
                  disabled={user.isAdmin ? false : true}
                  value={edit_description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div style={{ color: 'red' }}>
                  Note: Descritpion is read only and may not be edited.
                  <br />
                  Please create a note to add additional information.
                </div>
              </FloatingLabel>
            </Form>
          ) : (
            ''
          )}
          {error ? (
            <Message variant='danger'>
              There was an error updating the ticket. Please check all fields
              and resubmit
            </Message>
          ) : (
            ''
          )}
          {success ? (
            <>
              <Message variant='success'>
                {' '}
                Ticket Updated!
                <br />
                <Modal.Footer>
                  <Button variant='outline-info' onClick={toDetails}>
                    Go Back to Details
                  </Button>
                </Modal.Footer>
              </Message>
            </>
          ) : (
            <Modal.Footer>
              <Col>
                <Button variant='outline-danger' onClick={handleResetFields}>
                  Reset Fields
                </Button>
              </Col>
              <Row className='d-grid gap-2'>
                <Button variant='success' onClick={saveChanges}>
                  Save Changes
                </Button>
                <Button variant='secondary' onClick={handleClose}>
                  Close
                </Button>
              </Row>
            </Modal.Footer>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditTicketModal;
