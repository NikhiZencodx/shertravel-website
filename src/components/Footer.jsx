import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="footer-grid">

        {/* Brand column */}
        <div className="footer-about">
          <Link to="/" className="footer-logo">Shera Travels</Link>
          <p>
            Experience the true essence of Kashmir with Shera Travels — luxury,
            hand-crafted journeys through the Paradise on Earth, ensuring safety,
            comfort, and memories that last a lifetime.
          </p>
          <div className="social-links">
            <a href="https://www.instagram.com/sheraatravels/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="https://www.facebook.com/sheratravelssxr" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://wa.me/919149406965" aria-label="WhatsApp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            </a>
          </div>
        </div>

        {/* Explore column */}
        <div className="footer-nav">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/destinations">Destinations</Link></li>
            <li><Link to="/packages">Tour Packages</Link></li>
            <li><Link to="/services">Our Services</Link></li>
            <li><Link to="/about">Our Story</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* Support column */}
        <div className="footer-nav">
          <h4>Support</h4>
          <ul>
            <li><Link to="/contact">Booking Guide</Link></li>
            <li><Link to="/contact">FAQs</Link></li>
            <li><Link to="/contact">Privacy Policy</Link></li>
            <li><Link to="/contact">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Contact column */}
        <div className="footer-nav">
          <h4>Contact Us</h4>
          <ul>
            <li><span>📍 Radio Colony Lawaypora,<br />Srinagar J&amp;K – 190017</span></li>
            <li><span>📞 +91 9149406965</span></li>
            <li><span>📞 +91 9858966518</span></li>
            <li><span>✉️ sheratravels21@gmail.com</span></li>
            <li><span>✉️ info@sheratravels.com</span></li>
            <li><span className="gst-tag">GST: 01KODPS7232P1ZE</span></li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <span>© 2025 Shera Travels. All rights reserved.</span>
        <span>Crafted with ❤️ for Kashmir</span>
      </div>
    </footer>
  );
};

export default Footer;
