// index.js

const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from a .env file 

const app = express();
const PORT = process.env.PORT || 4000; // Use port 4000 

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON requests

// Import routes
const userRoutes = require('./routes/userRoutes'); 
app.use('/api/users', userRoutes); // Use user routes for the /api/users endpoint

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
