import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="about-page">
      <Navbar />
      <div className="page-container">
        <section className="section">
          <p className="section-tag">Explore Our Story</p>
          <h2 className="section-title">We are Shera Travels</h2>
          <div className="about-section" style={{ marginTop: '0', background: 'transparent', padding: '0' }}>
            <div className="about-left">
              <p style={{ fontSize: '16px', color: 'var(--gray)', lineHeight: '1.8', marginBottom: '20px' }}>
                Born in the heart of Kashmir, Shera Travels was founded with a single mission: to provide travelers with an authentic, safe, and breathtaking experience of the Paradise on Earth.
              </p>
              <p style={{ fontSize: '16px', color: 'var(--gray)', lineHeight: '1.8' }}>
                With over a decade of experience, we have hosted thousands of guests, from solo adventurers to honeymooning couples and large families. Our deep local knowledge ensures that you don't just see Kashmir—you feel it.
              </p>
            </div>
            <div className="about-right">
              <img src="/images/dal-lake.png" alt="Our Story" style={{ borderRadius: '24px', width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </section>

        <section className="section" style={{ background: '#fafafa', borderRadius: '40px' }}>
          <div style={{ textAlign: 'center', maxWidth: '1000px', margin: '0 auto' }}>
            <p className="section-tag">Our Values</p>
            <h2 className="section-title" style={{ marginBottom: '10px' }}>Integrity, Passion, and Excellence</h2>
            <p style={{ color: 'var(--gray)', marginBottom: '40px' }}>What drives us to create the perfect journey for you.</p>

            <div className="val-grid">
              <div className="val-card">
                <div className="val-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <h3>Local Experts</h3>
                <p>Our guides are locals who know the hidden gems and secret trails of the valley.</p>
              </div>
              <div className="val-card">
                <div className="val-icon" style={{ background: '#eef2ff', color: '#6366f1' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <h3>Safety First</h3>
                <p>Your security and comfort are our top priorities throughout the entire trip.</p>
              </div>
              <div className="val-card">
                <div className="val-icon" style={{ background: '#f0fdf4', color: '#22c55e' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3 5 2-2 2-2 10-13 16z"/><path d="M2.3 4.2c5 4.3 6.7 9 0 13.8"/></svg>
                </div>
                <h3>Eco-Conscious</h3>
                <p>We promote sustainable tourism to preserve the pristine beauty of Kashmir.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="about-legal-card">
            <div className="about-legal-left">
              <p className="section-tag">Business Info</p>
              <h2 className="section-title" style={{ fontSize: '28px', marginBottom: '20px' }}>Registered & Trusted</h2>
              <div className="about-legal-items">
                <div className="about-legal-item">
                  <div className="about-legal-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', color: 'var(--gray)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>GST Number</p>
                    <p style={{ fontSize: '18px', fontWeight: '800', color: 'var(--dark)', letterSpacing: '1px' }}>01KODPS7232P1ZE</p>
                  </div>
                </div>
                <div className="about-legal-item">
                  <div className="about-legal-icon" style={{ background: '#eef2ff', color: '#6366f1' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', color: 'var(--gray)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Address</p>
                    <p style={{ fontSize: '15px', fontWeight: '600', color: 'var(--dark)' }}>Radio Colony Lawaypora, Srinagar J&K - 190017</p>
                  </div>
                </div>
                <div className="about-legal-item">
                  <div className="about-legal-icon" style={{ background: '#f0fdf4', color: '#22c55e' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 11.1a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 0.43h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9a16 16 0 0 0 6.93 6.93l1.85-1.85a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 23.73 16.92z"/></svg>
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', color: 'var(--gray)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Phone</p>
                    <p style={{ fontSize: '15px', fontWeight: '600', color: 'var(--dark)' }}>+91 9149406965, 9858966518</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default About;
