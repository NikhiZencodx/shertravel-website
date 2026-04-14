import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PkgSlider from '../components/PkgSlider';

const Home = () => {
  return (
    <div className="home-page">
      <Navbar />
      
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-content">
          <div className="badge"><span className="badge-dot"></span> Kashmir's #1 Travel Partner</div>
          <h1>Discover<br />Paradise<br />With Us</h1>
          <div className="hero-search-bar">
            <div className="search-field">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <div><span className="label">Destination</span> Kashmir</div>
            </div>
            <div className="search-field">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
              <div><span className="label">Duration</span> Choose Days</div>
            </div>
            <div className="search-field">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>
              <div><span className="label">Guests</span> 1–10</div>
            </div>
            <button className="search-btn">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
              Search
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about-section" id="about">
        <div className="about-left">
          <p className="section-tag">Who We Are</p>
          <h2>About Shera Travels</h2>
          <p>Shera Travels crafts unforgettable journeys through the breathtaking landscapes of Kashmir — from the shimmering Dal Lake to the snow-capped peaks of Gulmarg. With deep local roots and a passion for authentic experiences, we bring you the true soul of the Valley.</p>
          <p>We handle everything — from comfortable houseboats on Dal Lake to guided treks in Pahalgam — so you can simply breathe in the beauty of Kashmir.</p>
          <div className="about-stats">
            <div className="stat-item">
              <h3>5000+</h3>
              <p>Happy Travelers</p>
            </div>
            <div className="stat-item">
              <h3>12+</h3>
              <p>Years Experience</p>
            </div>
            <div className="stat-item">
              <h3>50+</h3>
              <p>Destinations</p>
            </div>
          </div>
          <br />
          <a href="#contact" className="about-btn">
            Learn More
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
        </div>
        <div className="about-right">
          <div className="about-img" style={{ gridRow: '1/3' }}>
            <img src="/images/gulmarg.png" alt="Gulmarg Kashmir" />
          </div>
          <div className="about-img">
            <img src="/images/dal-lake.png" alt="Dal Lake" />
          </div>
          <div className="about-img">
            <img src="/images/pahalgam.png" alt="Pahalgam" />
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/* WHY US SECTION */}
      <section className="why-section">
        <div className="why-left">
          <h2>Why Choose<br />Shera Travels</h2>
          <ul className="why-list">
            <li>Curated Kashmir Experiences</li>
            <li>Trusted Local Guides</li>
            <li>Transparent, Competitive Pricing</li>
            <li>24/7 Travel Support</li>
            <li>Comfortable & Verified Stays</li>
            <li>Customised Itineraries</li>
          </ul>
          <a href="#packages" className="about-btn">See Our Packages</a>
        </div>
        <div className="why-right">
          <img src="/images/dal-lake.png" alt="Kashmir Valley" />
        </div>
      </section>

      {/* DESTINATIONS SECTION */}
      <section className="section" id="destinations">
        <div className="destinations-header">
          <div>
            <p className="section-tag">Top Picks</p>
            <h2 className="section-title">We only take you to<br />the <span>best destinations</span></h2>
          </div>
          <button className="explore-btn">Explore All</button>
        </div>
        <div className="destinations-grid">
          {[
            { name: 'Dal Lake', loc: 'Srinagar, Kashmir', rating: '4.9', img: '/images/dal-lake.png' },
            { name: 'Gulmarg', loc: 'Baramulla, Kashmir', rating: '4.8', img: '/images/gulmarg.png' },
            { name: 'Pahalgam', loc: 'Anantnag, Kashmir', rating: '4.7', img: '/images/pahalgam.png' },
            { name: 'Sonamarg', loc: 'Ganderbal, Kashmir', rating: '4.8', img: '/images/gulmarg.png' }
          ].map((dest, i) => (
            <div key={i} className="dest-card">
              <img src={dest.img} alt={dest.name} />
              <button className="dest-fav">♡</button>
              <div className="dest-info">
                <div className="dest-rating">
                  <svg width="12" height="12" fill="#f59e0b" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  {dest.rating}
                </div>
                <div className="dest-name">{dest.name}</div>
                <div className="dest-location">📍 {dest.loc}</div>
              </div>
              <div className="dest-arrow">→</div>
            </div>
          ))}
        </div>
      </section>

      {/* PACKAGES SECTION */}
      <PkgSlider />

      {/* TESTIMONIALS SECTION */}
      <section className="testimonials-section" id="reviews">
        <div className="testimonials-header">
          <div>
            <p className="section-tag">What They Say</p>
            <h2 className="section-title">Loved by Travelers<br />Like You</h2>
          </div>
          <button className="explore-btn">View All</button>
        </div>
        <div className="testi-grid">
          {[
            { name: 'Amit Sharma', role: 'Software Engineer · Delhi', text: 'Absolutely magical trip! Shera Travels arranged everything perfectly — houseboat on Dal Lake, Gulmarg cable car, Pahalgam meadows.', img: 'https://i.pravatar.cc/80?img=11' },
            { name: 'Priya Mehta', role: 'Teacher · Mumbai', text: 'Our honeymoon in Kashmir was a dream come true. Shera Travels customised every detail — the shikara rides, the tulip gardens, the candlelit dinners.', img: 'https://i.pravatar.cc/80?img=5' }
          ].map((testi, i) => (
            <div key={i} className="testi-card">
              <div className="testi-top">
                <div className="testi-avatars">
                  <img src={testi.img} alt={testi.name} />
                </div>
                <div>
                  <div className="testi-name">{testi.name}</div>
                  <div className="testi-role">{testi.role}</div>
                </div>
              </div>
              <div className="testi-stars">★★★★★</div>
              <p className="testi-text">"{testi.text}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="gallery-section">
        <div className="gallery-header">
          <div>
            <p className="section-tag">Kashmir In Frames</p>
            <h2 className="section-title">Adventure awakens<br />your soul.</h2>
          </div>
          <button className="explore-btn">Explore All</button>
        </div>
        <div className="gallery-grid">
          <div className="gallery-item gallery-play">
            <img src="/images/gulmarg.png" alt="Gulmarg Winter" />
          </div>
          <div className="gallery-item">
            <img src="/images/pahalgam.png" alt="Kashmir Valley" />
          </div>
          <div className="gallery-item tall">
            <img src="/images/dal-lake.png" alt="Dal Lake" />
          </div>
          <div className="gallery-item">
            <img src="/images/gulmarg.png" alt="Mountains" />
          </div>
          <div className="gallery-item">
            <img src="/images/pahalgam.png" alt="Pahalgam" />
          </div>
          <div className="gallery-item">
            <img src="/images/dal-lake.png" alt="Sonamarg" />
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <div className="cta-section" id="contact">
        <div className="cta-left">
          <h2>Get in touch with us<br />for your Kashmir trip</h2>
          <p>Ready to experience the Paradise on Earth? Let our Kashmir experts plan your perfect getaway.</p>
          <div className="cta-btns">
            <a href="tel:+919149406965" className="cta-primary">📞 Call Us Now</a>
            <a href="https://wa.me/919149406965" className="cta-secondary">💬 WhatsApp</a>
          </div>
        </div>
        <div className="cta-right">
          <img src="/images/dal-lake.png" alt="Kashmir Tour" />
        </div>
      </div>

      {/* BOOK FOOTER BAR */}
      <div className="book-bar">
        <h2>Book your Kashmir<br />tour today!</h2>
        <div className="book-bar-right">
          <input className="book-search" type="text" placeholder="🔍  Search destinations..." />
          <button className="book-now-btn">Book Now →</button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
