import express from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import config from 'config';
import Tech from '../models/techModel.js';
import { authHandler } from '../middleware/authMiddlreware.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// @desc        Get logged in user
// @route       GET /api/auth
// @access      private
router.get(
  '/',
  authHandler,
  asyncHandler(async (req, res) => {
    try {
      const tech = await Tech.findById(req.tech._id).select(
        '-password -createdAt -updatedAt -__v'
      );
      res.json(tech);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  })
);

// @desc        Auth user and get token
// @route       POST /api/auth
// @access      Public
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    try {
      let tech = await Tech.findOne({ email });

      if (!tech) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const isMatch = await bcrypt.compare(password, tech.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const payload = {
        tech: {
          _id: tech._id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 18000, //5 hours
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  })
);

export default router;
