const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/userController');

// Update routes to include /api/users
router.post('/api/users/signup', signup); // Updated route for signup
router.post('/api/users/login', login);   // Updated route for login

module.exports = router;

