import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className={`header-nav ${isOpen ? 'nav-open' : ''}`}>
        <Link to="/" className="nav-logo" onClick={() => setIsOpen(false)}>
          <img src="/images/EDUMATCH.png" alt="Shera Travels" />
        </Link>
        
        <div className="nav-right">
          <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
            <li><Link to="/destinations" onClick={() => setIsOpen(false)}>Destinations</Link></li>
            <li><Link to="/packages" onClick={() => setIsOpen(false)}>Packages</Link></li>
            <li><Link to="/about" onClick={() => setIsOpen(false)}>About Us</Link></li>
            <li><Link to="/contact" onClick={() => setIsOpen(false)}>Contact Us</Link></li>
            <li className="mobile-only"><Link to="/contact" className="nav-btn" onClick={() => setIsOpen(false)}>Book Now</Link></li>
          </ul>
          
          <a href="https://sheratravels-orcin.vercel.app/" target="_blank" rel="noopener noreferrer" className="nav-crm-icon desktop-only" title="Open CRM">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
            </svg>
            <span>CRM</span>
          </a>
          <Link to="/contact" className="nav-btn desktop-only">Book Now</Link>
          
          <button className="menu-btn" onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              {isOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>
      
      {isOpen && <div className="nav-overlay" onClick={() => setIsOpen(false)}></div>}
    </>
  );
};

export default Navbar;
