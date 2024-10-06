const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // Import mongoose
require('dotenv').config(); // Load environment variables from a .env file 

const app = express();
const PORT = process.env.PORT || 4000; // Use port 4000 

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON requests

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Import routes
const userRoutes = require('./routes/userRoutes'); 
app.use('/api/users', userRoutes); // Use user routes for the /api/users endpoint

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
