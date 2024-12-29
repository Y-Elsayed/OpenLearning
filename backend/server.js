const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

// Simple route to check if the server is working
app.get('/', (req, res) => {
  res.send('Hello, Open Learning!');
});


app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Login:', JSON.stringify({ email, password }));
  res.status(200).send('Login successful!');
});

app.post('/api/register', (req, res) => {
  const { username, firstName, lastName, email, password, gender, dateOfBirth } = req.body;
  console.log('register:', JSON.stringify({username, firstName, lastName, email, password, gender, dateOfBirth }));
  res.status(200).send('Login successful!');
});


// Connect to MongoDB (replace with your own MongoDB URI)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log('Error connecting to MongoDB:', err));

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
