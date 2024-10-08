// src/components/Signup.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        idNumber: '',
        accountNumber: '',
        password: '',
    });
    const [message, setMessage] = useState(''); // State for success message
    const navigate = useNavigate(); // Hook to navigate

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload on form submit
        try {
            // POST request to backend
            const response = await axios.post('http://localhost:4000/api/users/signup', formData);
            console.log('Response data:', response.data); // Log the response from the server
            setMessage('Signup successful!'); // Set success message
            setTimeout(() => {
                navigate('/login'); // Redirect to login page after a short delay
            }, 2000); // Adjust the delay as needed
        } catch (error) {
            // If there is a response from the server, log it
            if (error.response) {
                console.error('Error occurred:', error.response.data); // Log the error if signup fails
                alert(`Signup failed: ${error.response.data.error}`);
            } else {
                console.error('Error occurred:', error.message); // Log general errors
                alert(`Signup failed: ${error.message}`);
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" onChange={handleChange} placeholder="Name" required />
                <input type="text" name="surname" onChange={handleChange} placeholder="Surname" required />
                <input type="text" name="idNumber" onChange={handleChange} placeholder="ID Number" required />
                <input type="text" name="accountNumber" onChange={handleChange} placeholder="Account Number" required />
                <input type="password" name="password" onChange={handleChange} placeholder="Password" required />
                <button type="submit">Sign Up</button>
            </form>
            {message && <p>{message}</p>} {/* Display success message */}
        </div>
    );
};

export default Signup;

