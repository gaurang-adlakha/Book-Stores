import express from 'express';
import connectDB from './db/index.js';
import dotenv from 'dotenv';
import cors from 'cors';
import portfinder from 'portfinder';

import bookRoute from './route/book.route.js';
import userRoute from './route/user.route.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Default port
const defaultPort = process.env.PORT || 4001;

// Function to start server
const startServer = (port) => {
  connectDB()
    .then(() => {
      app.listen(port, () => {
        console.log(`Server is running at port: ${port}`);
      });
    })
    .catch((err) => {
      console.error('MongoDB connection failed: ', err);
    });
};

// Use portfinder to find an available port
portfinder.getPortPromise({ port: defaultPort })
  .then((availablePort) => {
    startServer(availablePort);
  })
  .catch((err) => {
    console.error('Error finding an available port: ', err);
  });

// Define routes
app.use('/book', bookRoute);
app.use('/user', userRoute);
