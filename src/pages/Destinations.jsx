import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Destinations = () => {
  const destinations = [
    { name: 'Dal Lake', loc: 'Srinagar, Kashmir', rating: '4.9', img: '/images/dal-lake.png', desc: 'The jewel in the crown of Kashmir, known for its houseboats and shikaras.' },
    { name: 'Gulmarg', loc: 'Baramulla, Kashmir', rating: '4.8', img: '/images/gulmarg.png', desc: 'A meadow of flowers and a premier skiing destination.' },
    { name: 'Pahalgam', loc: 'Anantnag, Kashmir', rating: '4.7', img: '/images/pahalgam.png', desc: 'A scenic valley by the Lidder River, perfect for trekking and relaxation.' },
    { name: 'Sonamarg', loc: 'Ganderbal, Kashmir', rating: '4.8', img: '/images/gulmarg.png', desc: 'The meadow of gold, offering breathtaking views of glaciers.' },
    { name: 'Yousmarg', loc: 'Budgam, Kashmir', rating: '4.6', img: '/images/yousmarg.jpg', desc: 'A quiet and scenic spot, perfect for nature lovers.' },
    { name: 'Aru Valley', loc: 'Pahalgam, Kashmir', rating: '4.9', img: '/images/aru-valley.jpg', desc: 'A base for treks and a peaceful retreat into nature.' }
  ];

  return (
    <div className="destinations-page">
      <Navbar />
      <div className="page-container">
        <section className="section">
          <p className="section-tag">Explore The Valley</p>
          <h2 className="section-title">All Destinations</h2>
          <p style={{ color: 'var(--gray)', marginTop: '10px', maxWidth: '600px' }}>
            Discover the most beautiful spots in Kashmir. From serene lakes to majestic mountains, we have curated the best for you.
          </p>
          
          <div className="destinations-grid">
            {destinations.map((dest, i) => (
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
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)', marginTop: '8px', lineHeight: '1.5' }}>{dest.desc}</p>
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

export default Destinations;
