import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Packages = () => {
  const packages = [
    { name: 'Kashmir Paradise Express', duration: '4 Days / 3 Nights', price: '₹12,499', img: '/images/dal-lake.png', status: 'BEST SELLER', features: ['Dal Lake Shikara Ride', 'Houseboat Stay', 'Srinagar Sightseeing'] },
    { name: 'Gulmarg Adventure Blast', duration: '3 Days / 2 Nights', price: '₹9,999', img: '/images/gulmarg.png', status: 'POPULAR', features: ['Gondola Ride', 'Skiing Session', 'Winter Jacket Rental'] },
    { name: 'Pure Valley Honeymoon', duration: '6 Days / 5 Nights', price: '₹28,999', img: '/images/pahalgam.png', status: 'RECOMMENDED', features: ['Candlelight Dinner', 'Flower Decor', 'Private Car', 'Pahalgam Stay'] },
    { name: 'Amarnath Yatra Special', duration: '5 Days / 4 Nights', price: '₹15,499', img: '/amarnath-yatra.jpg', status: 'SPECIAL', features: ['Helicopter Booking', 'Shikara Stay', 'Temple Tours'] },
    { name: 'The Great Kashmir Trek', duration: '8 Days / 7 Nights', price: '₹32,000', img: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80', status: 'ADVENTURE', features: ['Expert Mountain Guides', 'Camping Gear', 'All Meals Included'] }
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
                {pkg.status && <div className="pkg-badge">{pkg.status}</div>}
                <div className="pkg-img-wrap">
                  <img src={pkg.img} alt={pkg.name} />
                </div>
                <div className="pkg-content">
                  <div className="pkg-header">
                    <div className="pkg-duration-tag">{pkg.duration}</div>
                    <h3 style={{ marginTop: '12px' }}>{pkg.name}</h3>
                  </div>
                  <ul className="pkg-feat-list">
                    {pkg.features.map((f, j) => (
                      <li key={j}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="pkg-footer">
                    <div className="pkg-price-box">
                      <p>Starting At</p>
                      <p>{pkg.price}</p>
                    </div>
                    <button className="pkg-btn">Book Now</button>
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
