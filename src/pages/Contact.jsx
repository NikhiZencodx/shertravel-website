import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
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

          <div style={{ marginTop: '50px', display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 400px', gap: '60px' }}>
            <div style={{ background: 'var(--light-gray)', padding: '40px', borderRadius: 'var(--radius)' }}>
              <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600' }}>Full Name</label>
                    <input type="text" placeholder="John Doe" style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600' }}>Email Address</label>
                    <input type="email" placeholder="john@example.com" style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none' }} />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600' }}>Phone Number</label>
                  <input type="tel" placeholder="+91 7006XXXXXX" style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600' }}>Subject</label>
                  <select style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none', background: 'white' }}>
                    <option>Booking Inquiry</option>
                    <option>Custom Package</option>
                    <option>General Question</option>
                    <option>Support</option>
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600' }}>Your Message</label>
                  <textarea placeholder="Tell us about your dream trip..." rows="5" style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none', resize: 'vertical' }}></textarea>
                </div>
                <button type="submit" className="nav-btn" style={{ background: 'var(--dark)', color: 'white', padding: '14px', borderRadius: '8px', fontWeight: '700', marginTop: '10px' }}>Send Message</button>
              </form>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px' }}>Office Address</h3>
                <p style={{ color: 'var(--gray)', fontSize: '15px', lineHeight: '1.6' }}>
                  Radio Colony, Srinagar<br />
                  Lawaypora, Srinagar<br />
                  Jammu and Kashmir – 190017
                </p>
              </div>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px' }}>Direct Contact</h3>
                <p style={{ color: 'var(--gray)', fontSize: '15px', lineHeight: '1.6', marginBottom: '8px' }}>
                  <strong>Phone:</strong> +91 9149406965 | 9858966518
                </p>
                <p style={{ color: 'var(--gray)', fontSize: '15px', lineHeight: '1.6', marginBottom: '8px' }}>
                  <strong>Email:</strong> info@sheratravels.com
                </p>
                <p style={{ color: 'var(--gray)', fontSize: '15px', lineHeight: '1.6' }}>
                  <strong>WhatsApp:</strong> +91 9149406965
                </p>
              </div>
              <div style={{ borderRadius: 'var(--radius)', overflow: 'hidden', height: '220px' }}>
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
