import React, { useState } from 'react';

const BookingModal = ({ isOpen, onClose, destinationName }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '1',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Form data submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className={`modal-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        {submitted ? (
          <div className="modal-success">
            <div className="success-icon">✓</div>
            <h2>Thank You!</h2>
            <p>Your inquiry for <strong>{destinationName}</strong> has been received. Our Kashmir experts will contact you shortly.</p>
          </div>
        ) : (
          <>
            <div className="modal-header">
              <span className="section-tag">Book Your Trip</span>
              <h2>Explore {destinationName}</h2>
              <p>Fill out the form below and we'll help you plan the perfect journey.</p>
            </div>

            <form className="booking-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Enter your name" 
                  required 
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="name@example.com" 
                    required 
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    placeholder="+91 XXXXX XXXXX" 
                    required 
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Travel Date</label>
                  <input 
                    type="date" 
                    name="date" 
                    required 
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Number of Guests</label>
                  <select 
                    name="guests" 
                    value={formData.guests}
                    onChange={handleChange}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, '10+'].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Special Requests (Optional)</label>
                <textarea 
                  name="message" 
                  rows="3" 
                  placeholder="Anything else we should know?"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                Send Inquiry →
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
