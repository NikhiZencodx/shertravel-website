import React, { useRef, useState, useEffect } from 'react';

const PkgSlider = () => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(1); // Starting with Houseboat Stay (index 2 in data, but 0-indexed)

  const packages = [
    { name: 'Trekking', img: '/images/pahalgam.png' },
    { name: 'Skiing', img: '/images/gulmarg.png' },
    { name: 'Houseboat Stay', img: '/images/dal-lake.png' },
    { name: 'Pilgrimage', img: '/amarnath-yatra.jpg' },
    { name: 'Adventure', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80' },
    { name: 'Honeymoon', img: '/images/dal-lake.png' },
    { name: 'Family Tour', img: '/images/family-tour.png' }
  ];

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = 230; // 210px width + 20px gap
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(index);
    }
  };

  const scrollTo = (index) => {
    if (scrollRef.current) {
      const cardWidth = 230;
      scrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  // Auto-scroll logic
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % packages.length;
        scrollTo(nextIndex);
        return nextIndex;
      });
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [packages.length]);

  return (
    <section className="packages-section" id="packages">
      <p className="section-tag">What We Offer</p>
      <h2 className="section-title">Tailored packages for<br />every traveler</h2>

      <div 
        className="packages-scroll" 
        ref={scrollRef} 
        onScroll={handleScroll}
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {packages.map((pkg, i) => (
          <div 
            key={i} 
            className={`pkg-card ${i === activeIndex ? 'active' : ''}`}
            onClick={() => scrollTo(i)}
            style={{ 
              scrollSnapAlign: 'start',
              transform: i === activeIndex ? 'scale(1.06)' : 'scale(1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              zIndex: i === activeIndex ? 2 : 1,
              boxShadow: i === activeIndex ? '0 20px 40px rgba(0,0,0,0.2)' : 'none'
            }}
          >
            <img src={pkg.img} alt={pkg.name} />
            <div className="pkg-label">{pkg.name}</div>
          </div>
        ))}
      </div>

      <div className="pkg-active-dot">
           {/* We show 4 dots as in the original design, but let's map them to 4 main groups or just show dots for all */}
           {Array.from({ length: 4 }).map((_, i) => (
             <span 
               key={i} 
               className={Math.floor(activeIndex / 1.75) === i ? 'active' : ''}
               onClick={() => scrollTo(i * 2)}
               style={{ cursor: 'pointer' }}
             ></span>
           ))}
      </div>
    </section>
  );
};

export default PkgSlider;
