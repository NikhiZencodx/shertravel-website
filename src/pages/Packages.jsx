import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BookingModal from '../components/BookingModal';

const Packages = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState(null);

  const openBooking = (pkg) => {
    setSelectedPkg(pkg);
    setModalOpen(true);
  };

  const packages = [
    { name: 'Kashmir Paradise Express', duration: '4 Days / 3 Nights', price: '₹12,499', img: '/images/dal-lake.png', status: 'BEST SELLER', features: ['Dal Lake Shikara Ride', 'Houseboat Stay', 'Srinagar Sightseeing'] },
    { name: 'Gulmarg Adventure Blast', duration: '3 Days / 2 Nights', price: '₹9,999', img: '/images/gulmarg.png', status: 'POPULAR', features: ['Gondola Ride', 'Skiing Session', 'Winter Jacket Rental'] },
    { name: 'Pure Valley Honeymoon', duration: '6 Days / 5 Nights', price: '₹28,999', img: '/images/pahalgam.png', status: 'RECOMMENDED', features: ['Candlelight Dinner', 'Flower Decor', 'Private Car', 'Pahalgam Stay'] },
    { name: 'Amarnath Yatra Special', duration: '5 Days / 4 Nights', price: '₹15,499', img: '/amarnath-yatra.jpg', status: 'SPECIAL', features: ['Helicopter Booking', 'Shikara Stay', 'Temple Tours'] },
    { name: 'The Great Kashmir Trek', duration: '8 Days / 7 Nights', price: '₹32,000', img: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80', status: 'ADVENTURE', features: ['Expert Mountain Guides', 'Camping Gear', 'All Meals Included'] },
    { name: 'Leh Ladakh Explorer', duration: '7 Days / 6 Nights', price: '₹24,999', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', status: 'NEW', features: ['Pangong Lake Visit', 'Nubra Valley Stay', 'Monastery Tours', 'Bike Safari'] },
  ];

  const [searchParams] = useSearchParams();
  const destParam = searchParams.get('dest')?.toLowerCase();
  const durParam = searchParams.get('dur')?.toLowerCase();

  const filteredPackages = packages.filter(pkg => {
    const matchesDest = !destParam || pkg.name.toLowerCase().includes(destParam) || pkg.features.some(f => f.toLowerCase().includes(destParam));
    
    let matchesDur = true;
    if (durParam) {
      const days = parseInt(pkg.duration);
      if (durParam === 'short') matchesDur = days <= 4;
      else if (durParam === 'medium') matchesDur = days > 4 && days <= 7;
      else if (durParam === 'long') matchesDur = days > 7;
    }

    return matchesDest && matchesDur;
  });

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
            {filteredPackages.length > 0 ? (
              filteredPackages.map((pkg, i) => (
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
                      <button className="pkg-btn" onClick={() => openBooking(pkg)} style={{ border: 'none', cursor: 'pointer' }}>Book Now</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '50px', background: '#f8f8f8', borderRadius: '20px' }}>
                <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>No packages found</h3>
                <p style={{ color: 'var(--gray)' }}>Try searching for "Gulmarg" or "Dal Lake" instead.</p>
                <br />
                <button 
                  onClick={() => window.history.back()}
                  style={{ background: 'var(--dark)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}
                >
                  Go Back
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        destinationName={selectedPkg?.name}
        packagePrice={selectedPkg?.price}
      />
    </div>
  );
};

export default Packages;
