import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Import React Router and Link
import Signup from './components/Signup';  // Import the Signup component
import Login from './components/Login';    // Import the Login component
import PaymentForm from './components/PaymentForm'; // Import the PaymentForm component
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <p>Welcome to the App! Use the forms below to Sign Up, Login, or Make a Payment.</p>
          <nav>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
            <Link to="/payment">Make a Payment</Link>
          </nav>
        </header>

        {/* Routing Setup */}
        <Routes>
          <Route path="/signup" element={<Signup />} /> {/* Route to Signup form */}
          <Route path="/login" element={<Login />} />   {/* Route to Login form */}
          <Route path="/payment" element={<PaymentForm />} /> {/* Route to Payment form */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;



