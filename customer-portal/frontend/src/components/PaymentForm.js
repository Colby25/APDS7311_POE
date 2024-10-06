import React, { useState } from 'react';

const PaymentForm = () => {
  const [paymentDetails, setPaymentDetails] = useState({
    amount: '',
    currency: '',
    provider: '',
    swiftCode: '',
    recipientName: '',
    recipientAccount: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setPaymentDetails({
      ...paymentDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/payments', {  // Make sure this URL matches your backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentDetails),
      });
      
      const data = await response.json();
      if (response.ok) {
        setMessage('Payment submitted successfully');
        // Optionally clear the form fields
        setPaymentDetails({
          amount: '',
          currency: '',
          provider: '',
          swiftCode: '',
          recipientName: '',
          recipientAccount: ''
        });
      } else {
        // Check if data.error exists to provide a meaningful message
        setMessage(`Error: ${data.error || 'Payment submission failed'}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setMessage('Failed to submit payment. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Make a Payment</h2>
      <form onSubmit={handleSubmit}>
        <label>Amount:</label>
        <input
          type="number"
          name="amount"
          value={paymentDetails.amount}
          onChange={handleChange}
          required
        />
        <label>Currency:</label>
        <input
          type="text"
          name="currency"
          value={paymentDetails.currency}
          onChange={handleChange}
          required
        />
        <label>Provider:</label>
        <input
          type="text"
          name="provider"
          value={paymentDetails.provider}
          onChange={handleChange}
          required
        />
        <label>SWIFT Code:</label>
        <input
          type="text"
          name="swiftCode"
          value={paymentDetails.swiftCode}
          onChange={handleChange}
          required
        />
        <label>Recipient Name:</label>
        <input
          type="text"
          name="recipientName"
          value={paymentDetails.recipientName}
          onChange={handleChange}
          required
        />
        <label>Recipient Account Number:</label>
        <input
          type="text"
          name="recipientAccount"
          value={paymentDetails.recipientAccount}
          onChange={handleChange}
          required
        />
        <button type="submit">Pay Now</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PaymentForm;
