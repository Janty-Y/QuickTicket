import mongoose from 'mongoose';

const techSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    ticketsAssigned: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Tech = mongoose.model('Tech', techSchema);

export default Tech;
