import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const FALLBACK = [
  { id: 1, title: 'Trekking',      image_url: '/images/pahalgam.png' },
  { id: 2, title: 'Skiing',        image_url: '/images/gulmarg.png' },
  { id: 3, title: 'Houseboat Stay',image_url: '/images/dal-lake.png' },
  { id: 4, title: 'Pilgrimage',    image_url: '/amarnath-yatra.jpg' },
  { id: 5, title: 'Adventure',     image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80' },
  { id: 6, title: 'Honeymoon',     image_url: '/images/dal-lake.png' },
  { id: 7, title: 'Family Tour',   image_url: '/images/family-tour.png' },
];

const PkgSlider = () => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(1);
  const [packages, setPackages] = useState(FALLBACK);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await supabase
          .from('website_packages')
          .select('id, title, image_url')
          .eq('active', true)
          .order('sort_order', { ascending: true });
        if (data && data.length > 0) setPackages(data);
      } catch { /* keep fallback */ }
    };
    load();
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const index = Math.round(scrollRef.current.scrollLeft / 230);
      setActiveIndex(index);
    }
  };

  const scrollTo = (index) => {
    scrollRef.current?.scrollTo({ left: index * 230, behavior: 'smooth' });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => {
        const next = (prev + 1) % packages.length;
        scrollTo(next);
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [packages.length]);

  return (
    <section className="packages-section" id="packages">
      <p className="section-tag">What We Offer</p>
      <h2 className="section-title">Tailored packages for<br />every traveler</h2>

      <div className="packages-scroll" ref={scrollRef} onScroll={handleScroll} style={{ scrollSnapType: 'x mandatory' }}>
        {packages.map((pkg, i) => (
          <Link
            to="/packages"
            key={pkg.id || i}
            className={`pkg-card ${i === activeIndex ? 'active' : ''}`}
            onClick={e => { if (i !== activeIndex) { e.preventDefault(); scrollTo(i); } }}
            style={{
              scrollSnapAlign: 'start',
              transform: i === activeIndex ? 'scale(1.06)' : 'scale(1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              zIndex: i === activeIndex ? 2 : 1,
              boxShadow: i === activeIndex ? '0 20px 40px rgba(0,0,0,0.2)' : 'none',
              textDecoration: 'none',
              display: 'block',
            }}
          >
            <img src={pkg.image_url} alt={pkg.title} />
            <div className="pkg-label">{pkg.title}</div>
          </Link>
        ))}
      </div>

      <div className="pkg-active-dot">
        {Array.from({ length: 4 }).map((_, i) => (
          <span
            key={i}
            className={Math.floor(activeIndex / 1.75) === i ? 'active' : ''}
            onClick={() => scrollTo(i * 2)}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </div>
    </section>
  );
};

export default PkgSlider;
