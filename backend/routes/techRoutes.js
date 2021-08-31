import express from 'express';
import asyncHandler from 'express-async-handler';
import Tech from '../models/techModel.js';

const router = express.Router();

// @desc        Fetch all techs
// @route       GET /api/techs
// @access      private

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const tech = await Tech.find({}).select(
      '-createdAt -updatedAt -isAdmin -password -__v'
    );

    res.json(tech);
  })
);

// @desc        Fetch single tech
// @route       GET /api/techs/:id
// @access      private

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const tech = await Tech.findById(req.params.id).select(
      '-createdAt -updatedAt -isAdmin -password -__v'
    );

    if (tech) {
      res.json(tech);
    } else {
      res.status(404);
      throw new Error('Tech not found');
    }
  })
);

// @desc      Add/remove a ticket to a tech's queue
// @route     PUT /api/techs/:id
// @access    Private
router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const { assignTicketId, removeFromList } = req.body;
    const tech = await Tech.findById(req.params.id);

    if (tech) {
      // prevents duplicate entries and adds to the techs MyTickets
      if (!tech.ticketsAssigned.includes(assignTicketId) && !removeFromList) {
        tech.ticketsAssigned = [...tech.ticketsAssigned, assignTicketId];
      } // if the tech is being reassigned, this will remove the ticket id from that tech's ticketsAssigned
      else if (
        tech.ticketsAssigned.includes(assignTicketId) &&
        removeFromList
      ) {
        const filteredList = tech.ticketsAssigned.filter(
          (ticket) => ticket !== assignTicketId
        );
        tech.ticketsAssigned = [...filteredList];
      }
      const updateAssign = await tech.save();
      res.json(updateAssign);
    } else {
      res.status(404);
      throw new Error('Tech not found');
    }
  })
);

export default router;
