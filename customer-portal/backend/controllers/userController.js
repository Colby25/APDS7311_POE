const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup function
const signup = async (req, res) => {
    const { name, surname, idNumber, accountNumber, password } = req.body;

    // Validate the input data
    if (!name || !surname || !idNumber || !accountNumber || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ accountNumber });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = await User.create({ name, surname, idNumber, accountNumber, password: hashedPassword });

        // Respond with the user object (excluding the password)
        res.status(201).json({ id: user._id, name: user.name, surname: user.surname, accountNumber: user.accountNumber });
    } catch (error) {
        console.error('Error during signup:', error); // Log the error for debugging
        res.status(500).json({ error: 'Error registering user' });
    }
};

// Login function
const login = async (req, res) => {
    const { accountNumber, password } = req.body; // Use accountNumber based on your schema
    try {
        // Log received data
        console.log('Login attempt:', req.body);

        // Find user by account number
        const user = await User.findOne({ accountNumber });
        if (!user) return res.status(400).json({ error: 'User not found' });

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        // Generate token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error('Login error:', error); // Log the actual error
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { signup, login };
