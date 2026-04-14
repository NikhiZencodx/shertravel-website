import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <nav className="footer-nav">
            <Link to="/destinations">Discover</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/packages">Packages</Link>
          </nav>
          <Link to="/" className="footer-logo">
            <img src="/images/EDUMATCH.png" alt="Shera Travels Logo" style={{ height: '160px', width: 'auto', marginTop: '-50px', marginBottom: '-50px' }} />
          </Link>
          <div className="footer-social">
            <a href="#">𝕏</a>
            <a href="#">f</a>
            <a href="#">in</a>
            <a href="#">▶</a>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <span className="footer-copy">© 2025 Shera Travels. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#" style={{ fontSize: '12px', color: '#6b7280', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ fontSize: '12px', color: '#6b7280', textDecoration: 'none' }}>Terms and Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
