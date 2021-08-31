import mongoose from 'mongoose';

const noteSchema = mongoose.Schema(
  {
    techId: { type: String },
    submittedBy: { type: String },
    noteDescription: { type: String },
    edited: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const ticketSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    reportedBy: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },
    building: {
      type: String,
      required: true,
    },
    tech: {
      type: String,
    },
    priority: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    notes: [noteSchema],
    ticketHistory: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;
