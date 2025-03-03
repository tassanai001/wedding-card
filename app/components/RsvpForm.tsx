"use client";

import { useState } from 'react';

export default function RsvpForm() {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setMessage('Please enter your name');
      setIsError(true);
      return;
    }

    try {
      setIsSubmitting(true);
      setMessage('');
      setIsError(false);
      setIsSuccess(false);

      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setMessage(data.message || 'Thank you for your RSVP!');
        setName(''); // Clear the form
      } else {
        setIsError(true);
        setMessage(data.error || 'Failed to submit RSVP. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      setIsError(true);
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rsvp-form-container">
      <h2 style={{ fontSize: 24, color: '#634e4e', marginBottom: 20 }}>RSVP</h2>

      {isSuccess ? (
        <div className="success-message" style={{ color: '#4CAF50', marginBottom: 20 }}>
          {message}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="rsvp-form">
          <div className="form-group">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="name-input"
              style={{
                width: '100%',
                padding: '10px 15px',
                fontSize: '16px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                marginBottom: '15px',
              }}
            />
          </div>

          {isError && (
            <div className="error-message" style={{ color: '#F44336', marginBottom: 15 }}>
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="submit-button"
            style={{
              backgroundColor: '#c23a50',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              fontSize: '16px',
              borderRadius: '4px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              opacity: isSubmitting ? 0.7 : 1,
            }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      )}
    </div>
  );
}
