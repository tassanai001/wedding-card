/**
 * RSVP Form component for collecting guest responses
 */
import { useState } from 'react';
import { RSVP_API_ENDPOINT } from '../../lib/constants';

/**
 * Component for collecting and submitting RSVP responses
 */
export default function RsvpForm() {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorDetails, setErrorDetails] = useState('');

  /**
   * Handle form submission
   * @param e Form submission event
   */
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
      setErrorDetails('');

      const response = await fetch(RSVP_API_ENDPOINT, {
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
        if (data.details) {
          setErrorDetails(data.details);
          console.error('Error details:', data.details);
        }
      }
    } catch (error: unknown) {
      console.error('Error submitting RSVP:', error);
      setIsError(true);
      setMessage('An error occurred. Please try again.');
      if (error instanceof Error) {
        setErrorDetails(error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rsvp-form-container">
      {isSuccess ? (
        <div className="success-message text-[#4CAF50] mb-5">
          {message}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="rsvp-form">
          <div className="form-group">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="name-input w-full p-3 text-base border border-gray-300 rounded mb-4"
              aria-label="Your name"
            />
          </div>

          {isError && (
            <div>
              <div className="error-message text-[#F44336] mb-4">
                {message}
              </div>
              {errorDetails && (
                <div className="error-details text-[#F44336] mb-4">
                  {errorDetails}
                </div>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="submit-button bg-[#c23a50] text-white border-none py-2 px-5 text-base rounded cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            aria-label={isSubmitting ? 'Submitting...' : 'Submit RSVP'}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      )}
    </div>
  );
}
