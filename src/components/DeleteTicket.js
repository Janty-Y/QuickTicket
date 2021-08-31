import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTicket } from '../actions/ticketActions';
import {
  listTickets,
  listTicketDetails,
  clearDeleteState,
} from '../actions/ticketActions';
import { addToMyTickets } from '../actions/techActions';
import moment from 'moment';
import Message from './ui/Message';

const DeleteTicket = (toDelete) => {
  const dispatch = useDispatch();
  const { ticket } = toDelete;
  const { _id, tech, firstName, lastName, description, createdAt } = ticket;

  const ticketDelete = useSelector((state) => state.ticketDelete);
  const { success } = ticketDelete;

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const onConfirm = () => {
    //in case the ticket to be deleted is in a tech's MyTickets, this will remove it before it is deleted
    const removeFromList = true;
    const assignTechId = tech;
    const assignTicketId = _id;
    dispatch(addToMyTickets({ assignTechId, assignTicketId, removeFromList }));

    dispatch(deleteTicket(_id));
  };

  const toDetails = () => {
    setShow(false);
    dispatch(clearDeleteState);
    dispatch(listTickets());
    dispatch(listTicketDetails(null));
  };

  return (
    <>
      <Button variant='danger' size='sm' onClick={handleShow}>
        Delete Ticket
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
        size='md'
        centered
      >
        <Modal.Header>
          <Modal.Title>Delete Ticket</Modal.Title>
        </Modal.Header>

        {!success ? (
          <Modal.Body>
            <Message variant='danger'>
              This action will delete this ticket:
            </Message>
            <Message variant='secondary'>
              <strong>id:</strong> {_id} <br />
              <strong>Client:</strong> {firstName} {lastName}
              <br />
              <strong>Description:</strong> {description}
              <br />
              <strong>Submitted at:</strong>{' '}
              {moment(createdAt).format('MM/DD/YYYY - hh:mm a')}
            </Message>
          </Modal.Body>
        ) : (
          <>
            <Message variant='success'>Ticket Deleted!</Message>
          </>
        )}

        <Modal.Footer>
          {!success ? (
            <>
              <Button variant='danger' onClick={onConfirm}>
                Delete
              </Button>

              <Button variant='outline-dark' onClick={handleClose}>
                Close
              </Button>
            </>
          ) : (
            <Button variant='outline-info' onClick={toDetails}>
              Back to details
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteTicket;
