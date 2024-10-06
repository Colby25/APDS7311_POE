const express = require('express');
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken'); // For generating tokens
const User = require('../models/userModel'); 
const router = express.Router();

// POST /api/users/signup
router.post('/signup', async (req, res) => {
    const { name, surname, idNumber, accountNumber, password } = req.body;

    try {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const newUser = new User({ 
            name, 
            surname, 
            idNumber, 
            accountNumber, 
            password: hashedPassword // Save the hashed password
        });

        // Save user to the database
        await newUser.save();

        // Respond with a success message
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Error registering user' });
    }
});

// POST /api/users/login
router.post('/login', async (req, res) => {
    const { idNumber, password } = req.body;

    try {
        // Find the user by ID number
        const user = await User.findOne({ idNumber });

        if (!user) {
            return res.status(401).json({ error: 'Invalid ID number or password' });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid ID number or password' });
        }

        // Generate a token (optional)
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Respond with success message and token
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;

