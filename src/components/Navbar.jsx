import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="header-nav">
      <Link to="/" className="nav-logo">
        <img src="/images/EDUMATCH.png" alt="Shera Travels Logo" style={{ height: '220px', width: 'auto', marginTop: '-60px', marginBottom: '-60px' }} />
      </Link>
      <ul className="nav-links">
        <li><Link to="/destinations">Destinations</Link></li>
        <li><Link to="/packages">Packages</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
      </ul>
      <Link to="/contact" className="nav-btn">Book Now</Link>
    </nav>
  );
};

export default Navbar;
