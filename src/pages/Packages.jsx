import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BookingModal from '../components/BookingModal';
import { supabase } from '../lib/supabase';

const FALLBACK_PACKAGES = [
  { id: 1, title: 'Kashmir Paradise Express', days: 4, nights: 3, price: '₹12,499', image_url: '/images/dal-lake.png', status_badge: 'BEST SELLER', features: ['Dal Lake Shikara Ride', 'Houseboat Stay', 'Srinagar Sightseeing'] },
  { id: 2, title: 'Gulmarg Adventure Blast', days: 3, nights: 2, price: '₹9,999', image_url: '/images/gulmarg.png', status_badge: 'POPULAR', features: ['Gondola Ride', 'Skiing Session', 'Winter Jacket Rental'] },
  { id: 3, title: 'Pure Valley Honeymoon', days: 6, nights: 5, price: '₹28,999', image_url: '/images/pahalgam.png', status_badge: 'RECOMMENDED', features: ['Candlelight Dinner', 'Flower Decor', 'Private Car', 'Pahalgam Stay'] },
  { id: 4, title: 'Amarnath Yatra Special', days: 5, nights: 4, price: '₹15,499', image_url: '/amarnath-yatra.jpg', status_badge: 'SPECIAL', features: ['Helicopter Booking', 'Shikara Stay', 'Temple Tours'] },
  { id: 5, title: 'The Great Kashmir Trek', days: 8, nights: 7, price: '₹32,000', image_url: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80', status_badge: 'ADVENTURE', features: ['Expert Mountain Guides', 'Camping Gear', 'All Meals Included'] },
  { id: 6, title: 'Leh Ladakh Explorer', days: 7, nights: 6, price: '₹24,999', image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', status_badge: 'NEW', features: ['Pangong Lake Visit', 'Nubra Valley Stay', 'Monastery Tours', 'Bike Safari'] },
];

const Packages = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const { data, error } = await supabase
        .from('website_packages')
        .select('*')
        .eq('active', true)
        .order('sort_order', { ascending: true });
      if (error || !data || data.length === 0) {
        setPackages(FALLBACK_PACKAGES);
      } else {
        setPackages(data);
      }
    } catch {
      setPackages(FALLBACK_PACKAGES);
    }
    setLoading(false);
  };

  const destParam = searchParams.get('dest')?.toLowerCase();
  const durParam  = searchParams.get('dur')?.toLowerCase();

  const filtered = packages.filter(pkg => {
    const matchesDest = !destParam ||
      (pkg.title || '').toLowerCase().includes(destParam) ||
      (pkg.features || []).some(f => f.toLowerCase().includes(destParam));
    let matchesDur = true;
    if (durParam) {
      const d = pkg.days || 0;
      if (durParam === 'short')  matchesDur = d <= 4;
      if (durParam === 'medium') matchesDur = d > 4 && d <= 7;
      if (durParam === 'long')   matchesDur = d > 7;
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

          {loading ? (
            <div className="pkg-grid">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="pkg-item" style={{ background: '#f3f4f6', minHeight: 360, borderRadius: 20, animation: 'pulse 1.5s infinite' }} />
              ))}
            </div>
          ) : (
            <div className="pkg-grid">
              {filtered.length > 0 ? filtered.map((pkg, i) => (
                <div key={pkg.id || i} className="pkg-item">
                  {pkg.status_badge && <div className="pkg-badge">{pkg.status_badge}</div>}
                  <div className="pkg-img-wrap">
                    <img src={pkg.image_url} alt={pkg.title} />
                  </div>
                  <div className="pkg-content">
                    <div className="pkg-header">
                      <div className="pkg-duration-tag">{pkg.days} Days / {pkg.nights} Nights</div>
                      <h3 style={{ marginTop: '12px' }}>{pkg.title}</h3>
                    </div>
                    <ul className="pkg-feat-list">
                      {(pkg.features || []).map((f, j) => (
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
                      <button className="pkg-btn" onClick={() => { setSelectedPkg(pkg); setModalOpen(true); }} style={{ border: 'none', cursor: 'pointer' }}>
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              )) : (
                <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '50px', background: '#f8f8f8', borderRadius: '20px' }}>
                  <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>No packages found</h3>
                  <p style={{ color: 'var(--gray)' }}>Try searching for "Gulmarg" or "Dal Lake" instead.</p>
                  <br />
                  <button onClick={() => window.history.back()} style={{ background: 'var(--dark)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>
                    Go Back
                  </button>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
      <Footer />
      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        destinationName={selectedPkg?.title}
        packagePrice={selectedPkg?.price}
      />
    </div>
  );
};

export default Packages;
