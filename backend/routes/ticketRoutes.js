import express from 'express';
import asyncHandler from 'express-async-handler';
import Ticket from '../models/ticketModel.js';

const router = express.Router();

// @desc        Fetch all tickets
// @route       GET /api/tickets
// @access      private

router.get(
  '/',
  asyncHandler(async (req, res) => {
    try {
      // handles search params and errors
      if (req.query.email) {
        const emailRequest = await Ticket.find({ email: req.query.email });

        if (!emailRequest.length > 0) {
          res.status(400).json({ msg: 'Email not found' });
        } else {
          res.json(emailRequest);
        }
      } else if (req.query.tech) {
        const techRequest = await Ticket.find({ tech: req.query.tech });

        if (!techRequest.length > 0) {
          res.status(400).json({ msg: 'Tech has no tickets' });
        } else {
          res.json(techRequest);
        }
      } else if (req.query.reportedBy) {
        const reportRequest = await Ticket.find({
          reportedBy: req.query.reportedBy,
        });

        if (!reportRequest.length > 0) {
          res.status(400).json({ msg: 'Tech has no tickets submitted' });
        } else {
          res.json(reportRequest);
        }
      } else if (req.query.status) {
        const closedRequest = await Ticket.find({ status: req.query.status });

        if (!closedRequest.length > 0) {
          res
            .status(400)
            .json({ msg: 'No results for tickets marked Closed/Resolved' });
        } else {
          res.json(closedRequest);
        }
      }
      // if no search params, will fetch all tickets
      else {
        const tickets = await Ticket.find({});
        res.json(tickets);
      }
    } catch (error) {
      return res.status(500).json({ msg: 'Server Error' });
    }
  })
);

// @desc        Fetch single tickets
// @route       GET /api/tickets/:id
// @access      private

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    try {
      const ticket = await Ticket.findById(req.params.id);

      if (ticket) {
        res.json(ticket);
      }
    } catch (error) {
      return res.status(500).json({ msg: 'No ticket found - check ID' });
    }
  })
);

// @desc      Add new ticket
// @route     POST api/tickets
// @access    Private
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const {
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
      ticketHistory,
    } = req.body;

    const newTicket = new Ticket({
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
      ticketHistory,
    });

    if (await newTicket.save()) {
      res.status(201).json(newTicket);
    } else {
      res.status(404);
      throw new Error('Ticket not created');
    }
  })
);

// @desc      Edit a ticket
// @route     PUT /api/tickets/:id
// @access    Private
router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const {
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
      edit_ticketHistory,
      techId_newNote,
      submittedBy_newNote,
      noteDescription_newNote,
      noteId,
      deleteAction,
      editNoteDescription,
    } = req.body;

    const ticket = await Ticket.findById(req.params.id);

    // =========== Begin - Note Handlers ===================

    // request to add a new note
    if (ticket && noteDescription_newNote) {
      ticket.notes = [
        ...ticket.notes,
        {
          techId: techId_newNote,
          submittedBy: submittedBy_newNote,
          noteDescription: noteDescription_newNote,
        },
      ];
      ticket.ticketHistory = edit_ticketHistory;

      const updatedTicket = await ticket.save();
      res.json(updatedTicket);
    }

    // will find the index of based on the noteId that is passed
    // then updates the noteDesciption of that note's index
    else if (ticket && editNoteDescription) {
      const { notes } = ticket;
      const indexToEdit = notes.findIndex((index) => {
        return index._id == noteId;
      });
      notes[indexToEdit].noteDescription = editNoteDescription;
      notes[indexToEdit].edited = true;
      ticket.ticketHistory = edit_ticketHistory;

      const updatedTicket = await ticket.save();
      res.json(updatedTicket);
    }
    // request to delete a specific note
    else if (ticket && deleteAction) {
      const { notes } = ticket;
      const indexToDelete = notes.findIndex((index) => {
        return index._id == noteId;
      });
      notes.splice(indexToDelete, 1);
      ticket.ticketHistory = edit_ticketHistory;

      const updatedTicket = await ticket.save();
      res.json(updatedTicket);
    }
    // =========== End - Note Handlers ===================

    // request to edit the actual ticket
    else if (ticket) {
      ticket.firstName = edit_firstName;
      ticket.lastName = edit_lastName;
      ticket.priority = edit_priority;
      ticket.phone = edit_phone;
      ticket.email = edit_email;
      ticket.department = edit_department;
      ticket.location = edit_location;
      ticket.building = edit_building;
      ticket.category = edit_category;
      ticket.status = edit_status;
      ticket.tech = edit_tech;
      ticket.ticketHistory = edit_ticketHistory;

      const updatedTicket = await ticket.save();
      res.json(updatedTicket);
    } else {
      res.status(404);
      throw new Error('Ticket not found');
    }
  })
);

// @desc      Delete a ticket
// @route     DELETE /api/tickets/:id
// @access    Private

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    try {
      let ticket = await Ticket.findById(req.params.id);

      if (!ticket) return res.status(404).json({ msg: 'Ticket not found' });

      await Ticket.findByIdAndRemove(req.params.id);

      res.json({ msg: 'Ticket removed' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  })
);

export default router;
