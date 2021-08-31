import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import ticketRoutes from './routes/ticketRoutes.js';
import authRoutes from './routes/authRoutes.js';
import techRoutes from './routes/techRoutes.js';
import path from 'path';

dotenv.config();

connectDB();

const app = express();

//  allows data to be processed from the body as JSON
app.use(express.json());

// Define Routes
app.use('/api/tickets', ticketRoutes);
app.use('/api/techs', techRoutes);
app.use('/api/auth', authRoutes);

// serve static assets in production
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('./frontend/build'));

  const __dirname = path.resolve();

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '.', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

// Error handling for non-existing routes
app.use(notFound);

// custom error handling for production mode
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
