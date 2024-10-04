// src/components/Login.js

import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [loginData, setLoginData] = useState({
        idNumber: '',
        password: '',
    });

    // Handle form input changes
    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload on form submit
        try {
            const response = await axios.post('http://localhost:4000/api/users/login', loginData); // POST request to backend
            console.log('Login successful:', response.data); // Log the response from the server
        } catch (error) {
            console.error('Login error:', error.response.data); // Log the error if login fails
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="idNumber" onChange={handleChange} placeholder="ID Number" required />
            <input type="password" name="password" onChange={handleChange} placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
