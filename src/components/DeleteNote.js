import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import Message from './ui/Message';
import { Button, Modal } from 'react-bootstrap';
import { createNote, resetNote } from '../actions/noteActions';
import { listTicketDetails } from '../actions/ticketActions';

const DeleteNote = (currentNote) => {
  const { ticket, note } = currentNote;
  const dispatch = useDispatch();

  const authActions = useSelector((state) => state.login);
  const { user } = authActions;

  const noteHandler = useSelector((state) => state.noteHandler);
  const { success } = noteHandler;

  // handles if the edit note modal is active or not
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const onConfirm = () => {
    const edit_ticketHistory = [...ticket.ticketHistory];
    const currentDate = moment(new Date()).format('MM/DD/YYYY - hh:mm a');
    let deleteAction = true;
    const submittedBy_newNote = `${user.firstName} ${user.lastName}`;
    const ticketId = ticket._id;
    const noteId = note._id;
    if (user._id !== currentNote.note._id) {
      edit_ticketHistory.push(
        `${currentDate} - ${user.firstName} ${user.lastName} deleted ${currentNote.note.submittedBy}'s note`
      );
    } else {
      edit_ticketHistory.push(
        `${currentDate} - ${submittedBy_newNote} deleted their note`
      );
    }
    const deleteNote = {
      ticketId,
      noteId,
      deleteAction,
      edit_ticketHistory,
    };

    dispatch(createNote(deleteNote));
  };

  const toDetails = () => {
    setShow(false);

    dispatch(listTicketDetails(ticket._id));
    dispatch(resetNote);
  };

  return (
    <>
      <Button variant='outline-danger' size='sm' onClick={handleShow}>
        Delete
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
        size='md'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Note</Modal.Title>
        </Modal.Header>

        {!success ? (
          <Modal.Body>
            <Message variant='danger'>
              This action will delete the following note:
            </Message>
            <Message variant='secondary'>"{note.noteDescription}"</Message>
            <br /> by {note.submittedBy} <br /> created at
            {` ${moment(note.createdAt).format('MM/DD/YYYY - hh:mm a')}`}
          </Modal.Body>
        ) : (
          <>
            <Message variant='success'>Note Deleted!</Message>
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

export default DeleteNote;
