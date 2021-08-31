import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { Button, Row, Col, Modal, Form, FloatingLabel } from 'react-bootstrap';
import Message from './ui/Message';
import { listTicketDetails } from '../actions/ticketActions';
import { createNote, resetNote } from '../actions/noteActions';

const EditNoteModal = (currentNote) => {
  const { ticket, note } = currentNote;
  const dispatch = useDispatch();

  const authActions = useSelector((state) => state.login);
  const { user } = authActions;

  const noteHandler = useSelector((state) => state.noteHandler);
  const { success } = noteHandler;

  const [validated, setValidated] = useState(false);
  const [editNoteDescription, setNoteDescription] = useState(
    note.noteDescription
  );

  // handles if the edit note modal is active or not
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleClear = () => {
    setNoteDescription(note.noteDescription);

    setValidated(false);
  };

  const onSubmit = (event) => {
    const edit_ticketHistory = [...ticket.ticketHistory];
    const currentDate = moment(new Date()).format('MM/DD/YYYY - hh:mm a');

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    const submittedBy_newNote = `${user.firstName} ${user.lastName}`;
    const ticketId = ticket._id;
    const noteId = note._id;

    if (user._id !== currentNote.note._id) {
      edit_ticketHistory.push(
        `${currentDate} - ${submittedBy_newNote} edited ${note.submittedBy}'s note`
      );
    } else {
      edit_ticketHistory.push(
        `${currentDate} - ${submittedBy_newNote} edited their note`
      );
    }
    const updatedNote = {
      ticketId,
      noteId,
      editNoteDescription,
      edit_ticketHistory,
    };

    dispatch(createNote(updatedNote));
  };

  const toDetails = () => {
    setShow(false);

    dispatch(listTicketDetails(ticket._id));
    dispatch(resetNote);
  };

  return (
    <>
      <Button size='sm' variant='outline-dark' onClick={handleShow}>
        Edit
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
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>

        {!success ? (
          <Form noValidate validated={validated}>
            <Form.Group as={Col}>
              <FloatingLabel controlId='floatingInput' label='Note Description'>
                <Form.Control
                  required
                  as='textarea'
                  style={{ height: '400px' }}
                  value={editNoteDescription}
                  onChange={(e) => setNoteDescription(e.target.value)}
                />
                <Form.Control.Feedback type='invalid' className='px-2'>
                  Note description cannot be empty
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
          </Form>
        ) : (
          <>
            <Message variant='success'>Note Updated!</Message>
          </>
        )}

        <Modal.Footer>
          {!success ? (
            <>
              <Col>
                <Button variant='outline-danger' onClick={handleClear}>
                  Reset
                </Button>
              </Col>
              <Row className='d-grid gap-2'>
                <Button variant='success' onClick={onSubmit}>
                  Submit Edit
                </Button>

                <Button variant='outline-dark' onClick={handleClose}>
                  Close
                </Button>
              </Row>
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

export default EditNoteModal;
