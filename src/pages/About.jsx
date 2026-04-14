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

        <section className="section" style={{ background: '#fafafa', borderRadius: '40px', marginTop: '40px' }}>
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
      </div>
      <Footer />
    </div>
  );
};

export default About;
