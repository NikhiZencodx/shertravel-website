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
          <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '16px', color: 'var(--gray)', lineHeight: '1.8', marginBottom: '20px' }}>
                Born in the heart of Kashmir, Shera Travels was founded with a single mission: to provide travelers with an authentic, safe, and breathtaking experience of the Paradise on Earth.
              </p>
              <p style={{ fontSize: '16px', color: 'var(--gray)', lineHeight: '1.8' }}>
                With over a decade of experience, we have hosted thousands of guests, from solo adventurers to honeymooning couples and large families. Our deep local knowledge ensures that you don't just see Kashmir—you feel it.
              </p>
            </div>
            <div style={{ borderRadius: 'var(--radius)', overflow: 'hidden', height: '400px' }}>
              <img src="https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&q=80" alt="About Us" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </section>

        <section className="section" style={{ background: 'var(--light-gray)' }}>
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <p className="section-tag">Our Values</p>
            <h2 className="section-title" style={{ marginBottom: '40px' }}>Integrity, Passion, and Excellence</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
              <div style={{ background: 'white', padding: '30px', borderRadius: 'var(--radius)' }}>
                <h3 style={{ marginBottom: '10px' }}>Local Experts</h3>
                <p style={{ fontSize: '14px', color: 'var(--gray)' }}>Our guides are locals who know the hidden gems of the valley.</p>
              </div>
              <div style={{ background: 'white', padding: '30px', borderRadius: 'var(--radius)' }}>
                <h3 style={{ marginBottom: '10px' }}>Safety First</h3>
                <p style={{ fontSize: '14px', color: 'var(--gray)' }}>Your security and comfort are our top priorities throughout the trip.</p>
              </div>
              <div style={{ background: 'white', padding: '30px', borderRadius: 'var(--radius)' }}>
                <h3 style={{ marginBottom: '10px' }}>Eco-Conscious</h3>
                <p style={{ fontSize: '14px', color: 'var(--gray)' }}>We promote sustainable tourism to preserve the beauty of Kashmir.</p>
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
