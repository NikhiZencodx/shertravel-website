import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Packages = () => {
  const packages = [
    { name: 'Kashmir Paradise Express', duration: '4 Days / 3 Nights', price: '₹12,499', img: '/images/dal-lake.png', features: ['Dal Lake Shikara Ride', 'Houseboat Stay', 'Srinagar Sightseeing'] },
    { name: 'Gulmarg Adventure Blast', duration: '3 Days / 2 Nights', price: '₹9,999', img: '/images/gulmarg.png', features: ['Gondola Ride', 'Skiing Session', 'Winter Jacket Rental'] },
    { name: 'Pure Valley Honeymoon', duration: '6 Days / 5 Nights', price: '₹28,999', img: '/images/pahalgam.png', features: ['Candlelight Dinner', 'Flower Decor', 'Private Car', 'Pahalgam Stay'] },
    { name: 'Amarnath Yatra Special', duration: '5 Days / 4 Nights', price: '₹15,499', img: '/amarnath-yatra.jpg', features: ['Helicopter Booking', 'Shikara Stay', 'Temple Tours'] },
    { name: 'The Great Kashmir Trek', duration: '8 Days / 7 Nights', price: '₹32,000', img: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80', features: ['Expert Mountain Guides', 'Camping Gear', 'All Meals Included'] }
  ];

  return (
    <div className="packages-page">
      <Navbar />
      <div className="page-container">
        <section className="section">
          <p className="section-tag">Perfect Plans</p>
          <h2 className="section-title">Our Tour Packages</h2>
          <p style={{ color: 'var(--gray)', marginTop: '10px', maxWidth: '600px' }}>
            We offer a variety of packages to suit every budget and interest. Choose the one that fits your dream trip.
          </p>

          <div className="pkg-grid">
            {packages.map((pkg, i) => (
              <div key={i} className="pkg-item">
                <div className="pkg-img-wrap">
                  <img src={pkg.img} alt={pkg.name} />
                </div>
                <div className="pkg-content">
                  <div className="pkg-header">
                    <h3 style={{ fontSize: '18px', fontWeight: '800' }}>{pkg.name}</h3>
                    <span style={{ fontSize: '12px', background: 'var(--white)', padding: '4px 10px', borderRadius: '50px', fontWeight: '600' }}>{pkg.duration}</span>
                  </div>
                  <ul className="pkg-feat-list">
                    {pkg.features.map((f, j) => (
                      <li key={j} style={{ fontSize: '14px', color: 'var(--gray)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: 'var(--gold)' }}>✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="pkg-footer">
                    <div>
                      <p style={{ fontSize: '11px', color: 'var(--gray)', textTransform: 'uppercase', letterSpacing: '1px' }}>Starting At</p>
                      <p style={{ fontSize: '20px', fontWeight: '900', color: 'var(--dark)' }}>{pkg.price}</p>
                    </div>
                    <button className="nav-btn" style={{ background: 'var(--dark)', color: 'white' }}>View Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Packages;
