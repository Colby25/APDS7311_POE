import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = ({ onLogin }) => { // Accept onLogin as a prop
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

        try {
            const response = await axios.post('http://localhost:4000/api/users/login', loginData); // POST request to backend
            if (response.status === 200) {
                console.log('User logged in successfully:', response.data.message);
                onLogin(); // Call onLogin to update login status in App.js

                // Redirect to payment page with success message
                navigate('/payment', { state: { successMessage: `Logged in successfully as "${loginData.accountNumber}"!` } });
            }
        } catch (error) {
            if (error.response) {
                console.error('Login error:', error.response.data); // Log error if login fails
            } else {
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



