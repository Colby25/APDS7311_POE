import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import React Router
import Signup from './components/Signup';  // Import the Signup component
import Login from './components/Login';    // Import the Login component
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <p>Welcome to the App! Use the forms below to Sign Up or Login.</p>
        </header>

        {/* Routing Setup */}
        <Routes>
          <Route path="/signup" element={<Signup />} /> {/* Route to Signup form */}
          <Route path="/login" element={<Login />} />   {/* Route to Login form */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;


