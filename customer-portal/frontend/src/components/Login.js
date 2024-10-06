// src/components/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
    const [loginData, setLoginData] = useState({
        accountNumber: '',
        password: '',
    });

    const navigate = useNavigate(); // Create a navigate instance

    // Handle form input changes
    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload on form submit

        // Log the data being sent
        console.log('Login attempt:', loginData); // Log input data

        try {
            const response = await axios.post('http://localhost:4000/api/users/login', loginData); // POST request to backend
            console.log('Login successful:', response.data); // Log the response from the server

            // Perform actions upon successful login
            if (response.status === 200) {
                console.log('User logged in successfully:', response.data.message);
                // Redirect user to the desired page after successful login
                navigate('/home'); // Change '/home' to the desired route
            }
        } catch (error) {
            if (error.response) {
                // Log specific server error response
                console.error('Login error:', error.response.data); // Log the error if login fails
                console.error('Status Code:', error.response.status); // Log status code for more insight
            } else {
                // Log error if response is not received
                console.error('Login error:', error.message);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="accountNumber"
                onChange={handleChange}
                placeholder="Account Number"
                required
            />
            <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Password"
                required
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
