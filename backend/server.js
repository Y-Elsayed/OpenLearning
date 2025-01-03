const express = require('express');
// const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes'); // Import user routes
// Import your models
const User = require('./models/user');
const Post = require('./models/post');

dotenv.config(); // Load environment variables from .env file

const app = express();
// app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

// Simple route to check if the server is working
app.get('/', (req, res) => {
  res.send('Hello, Open Learning!');
});


// Use user routes
app.use('/api/users', userRoutes);


// Connect to MongoDB 
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Start the server
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
