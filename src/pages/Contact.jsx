import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sending, setSending]         = useState(false);
  const [sendError, setSendError]     = useState('');

  const SUPABASE_URL     = 'https://puufrlhhdjsqnbseayvh.supabase.co'
  const SUPABASE_ANON    = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1dWZybGhoZGpzcW5ic2VheXZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyNzIxNzMsImV4cCI6MjA5MTg0ODE3M30.yByTKkvnlWV5MNAT8Coo2PUKhBOeQWxgtIFdSsd3hbg'

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = {
      name:    fd.get('name')    || '',
      email:   fd.get('email')   || '',
      phone:   fd.get('phone')   || '',
      subject: fd.get('subject') || '',
      message: fd.get('message') || '',
    };

    setSending(true);
    setSendError('');
    try {
      // Save to Supabase leads table — shows up instantly in CRM
      const digits = (data.phone || '').replace(/\D/g, '')
      const phone  = digits.length === 10 ? '91' + digits : digits

      const res = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
        method:  'POST',
        headers: {
          'Content-Type':  'application/json',
          'apikey':        SUPABASE_ANON,
          'Authorization': `Bearer ${SUPABASE_ANON}`,
          'Prefer':        'return=minimal',
        },
        body: JSON.stringify({
          id:          crypto.randomUUID(),
          name:        data.name,
          email:       data.email || null,
          phone:       phone || null,
          whatsapp:    phone || null,
          destination: data.subject || 'Website Enquiry',
          notes:       `Website Contact Form\n\nMessage: ${data.message}`,
          stage:       'new_inquiry',
          adults:      1,
          children:    0,
          infants:     0,
          created_at:  new Date().toISOString(),
          updated_at:  new Date().toISOString(),
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `Save failed (${res.status})`);
      }

      // Also fire email notification — silent if it fails
      fetch('/api/send-email', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ type: 'contact', contact: data }),
      }).catch(() => {});

      setIsSubmitted(true);
    } catch (err) {
      setSendError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="contact-page">
      <Navbar />
      <div className="page-container">
        <section className="section">
          <p className="section-tag">Get In Touch</p>
          <h2 className="section-title">Contact Our Experts</h2>
          <p style={{ color: 'var(--gray)', marginTop: '10px', maxWidth: '600px' }}>
            Have questions about your trip? Our Kashmir travel experts are here to help you plan the perfect itinerary.
          </p>

          <div className="contact-grid">
            <div className="contact-form-wrap">
              {isSubmitted ? (
                <div className="modal-success" style={{ padding: '60px 20px' }}>
                  <div className="success-icon">✓</div>
                  <h2 style={{ fontSize: '36px', marginBottom: '16px' }}>Thank You!</h2>
                  <p style={{ fontSize: '18px', color: 'var(--gray)', lineHeight: '1.6' }}>
                    Your message has been received! Our travel experts will get back to you within 24 hours to help you plan your Kashmir journey.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="nav-btn" 
                    style={{ background: 'var(--dark)', color: 'white', padding: '12px 24px', borderRadius: '12px', fontWeight: '700', marginTop: '30px', cursor: 'pointer' }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="form-row-mobile">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '13px', fontWeight: '600' }}>Full Name</label>
                      <input type="text" name="name" placeholder="John Doe" required />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '13px', fontWeight: '600' }}>Email Address</label>
                      <input type="email" name="email" placeholder="john@example.com" required />
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600' }}>Phone Number</label>
                    <input type="tel" name="phone" placeholder="+91 7006XXXXXX" required />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600' }}>Subject</label>
                    <select name="subject" required>
                      <option value="">Select a subject</option>
                      <option>Booking Inquiry</option>
                      <option>Custom Package</option>
                      <option>General Question</option>
                      <option>Support</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600' }}>Your Message</label>
                    <textarea name="message" placeholder="Tell us about your dream trip..." rows="5" required></textarea>
                  </div>
                  <button type="submit" className="nav-btn" disabled={sending} style={{ background: 'var(--dark)', color: 'white', padding: '16px', borderRadius: '12px', fontWeight: '700', marginTop: '10px', cursor: sending ? 'not-allowed' : 'pointer' }}>
                    {sending ? 'Sending...' : 'Send Message'}
                  </button>
                  {sendError && (
                    <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '10px', padding: '10px 14px', background: '#fef2f2', borderRadius: '8px', border: '1px solid #fecaca' }}>
                      ⚠️ {sendError}
                    </p>
                  )}
                </form>
              )}
            </div>

            <div className="contact-info-wrap">
              <div className="contact-info-card">
                <div className="info-item">
                  <div className="info-icon-box">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                  </div>
                  <div className="info-text">
                    <h4>Office Address</h4>
                    <p>Radio Colony, Srinagar, Lawaypora<br />Srinagar, Jammu & Kashmir – 190017</p>
                  </div>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="info-item">
                  <div className="info-icon-box">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                  </div>
                  <div className="info-text">
                    <h4>Phone</h4>
                    <p>+91 9149406965<br />+91 9858966518</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon-box" style={{ background: '#eef2ff', color: '#6366f1' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  </div>
                  <div className="info-text">
                    <h4>Email Address</h4>
                    <p>sheratravels21@gmail.com</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon-box" style={{ background: '#f0fdf4', color: '#22c55e' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
                  </div>
                  <div className="info-text">
                    <h4>WhatsApp</h4>
                    <p>+91 9149406965</p>
                  </div>
                </div>
              </div>

              <div style={{ borderRadius: '20px', overflow: 'hidden', height: '240px', border: '1px solid #f0f0f0', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                <iframe
                  title="Shera Travels Location"
                  src="https://www.google.com/maps?q=Radio+Colony,+Lawaypora,+Srinagar,+Jammu+and+Kashmir+190017&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
