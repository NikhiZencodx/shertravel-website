import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const services = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <path d="M3.29 7L12 12l8.71-5"/><line x1="12" y1="22" x2="12" y2="12"/>
      </svg>
    ),
    tag: 'Air Travel',
    title: 'Flight Ticketing',
    desc: 'Hassle-free domestic and international flight bookings at the best available fares. We handle everything from search to confirmation.',
    points: ['Domestic & International flights', 'Best fare guarantee', 'Group bookings', 'Last-minute tickets'],
    color: '#e0f2fe',
    iconColor: '#0284c7',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    tag: 'Stay',
    title: 'Hotel Bookings',
    desc: 'From luxury hotels to traditional houseboats on Dal Lake — we curate the perfect accommodation for every budget and preference.',
    points: ['5-star resorts & boutique hotels', 'Dal Lake houseboats', 'Budget guesthouses', 'Instant confirmation'],
    color: '#fef3c7',
    iconColor: '#d97706',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
        <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    tag: 'Transport',
    title: 'Cab & Transfer Services',
    desc: 'Private, reliable, and comfortable cab services across Kashmir and Ladakh. Airport pickups, sightseeing tours, and intercity transfers.',
    points: ['Airport pick-up & drop', 'Full-day sightseeing', 'Outstation trips', 'AC & non-AC vehicles'],
    color: '#f0fdf4',
    iconColor: '#16a34a',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    tag: 'Documentation',
    title: 'Visa Services',
    desc: 'Complete visa assistance for international travel. We guide you through every step — documentation, application, and follow-up.',
    points: ['Tourist & business visas', 'Document checklist support', 'Application tracking', 'Fast processing'],
    color: '#fdf4ff',
    iconColor: '#9333ea',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    tag: 'Couples',
    title: 'Honeymoon Packages',
    desc: 'Romantic, tailor-made honeymoon experiences in Kashmir. Private shikara rides, candlelight dinners, and flower-decorated rooms.',
    points: ['Private shikara rides', 'Flower room décor', 'Candlelight dinners', 'Couple photography'],
    color: '#fff1f2',
    iconColor: '#e11d48',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="3 11 22 2 13 21 11 13 3 11"/>
      </svg>
    ),
    tag: 'Adventure',
    title: 'Adventure Activities',
    desc: 'Thrilling adventures across the valley — from Gulmarg skiing and gondola rides to trekking in Sonamarg and Aru Valley.',
    points: ['Gulmarg skiing & snowboarding', 'Gondola cable car rides', 'Himalayan trekking', 'River rafting & camping'],
    color: '#fff7ed',
    iconColor: '#ea580c',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    tag: 'Pilgrimage',
    title: 'Religious & Yatra Tours',
    desc: 'Sacred journeys managed with care. Amarnath Yatra helicopter bookings, Vaishno Devi, and other religious destinations handled end-to-end.',
    points: ['Amarnath Yatra helicopter', 'Vaishno Devi arrangements', 'Sharda Peeth tours', 'Group pilgrimages'],
    color: '#f0fdf4',
    iconColor: '#15803d',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    tag: 'Groups',
    title: 'Group & Corporate Tours',
    desc: 'Customised tours for families, friend groups, schools, and corporate teams. Special group discounts with dedicated trip coordinators.',
    points: ['Family & group discounts', 'Corporate retreats', 'School / college trips', 'Dedicated trip manager'],
    color: '#eff6ff',
    iconColor: '#2563eb',
  },
];

const Services = () => {
  return (
    <div className="services-page">
      <Navbar />
      <div className="page-container">

        {/* Header */}
        <section className="section svc-hero-section">
          <div className="svc-hero-text">
            <p className="section-tag">What We Offer</p>
            <h1 className="section-title">Our Services</h1>
            <p className="svc-hero-sub">
              From flight bookings to full Kashmir tour packages — Shera Travels handles everything so your only job is to enjoy the journey.
            </p>
          </div>
          <div className="svc-hero-stats">
            <div className="svc-stat"><span>5000+</span><p>Happy Travelers</p></div>
            <div className="svc-stat"><span>12+</span><p>Years Experience</p></div>
            <div className="svc-stat"><span>8</span><p>Services</p></div>
            <div className="svc-stat"><span>24/7</span><p>Support</p></div>
          </div>
        </section>

        {/* Service Cards */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="svc-grid">
            {services.map((svc, i) => (
              <div key={i} className="svc-card">
                <div className="svc-icon" style={{ background: svc.color, color: svc.iconColor }}>
                  {svc.icon}
                </div>
                <div className="svc-tag">{svc.tag}</div>
                <h3 className="svc-title">{svc.title}</h3>
                <p className="svc-desc">{svc.desc}</p>
                <ul className="svc-points">
                  {svc.points.map((pt, j) => (
                    <li key={j}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      {pt}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="svc-cta">Enquire Now →</Link>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="section svc-process-section">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p className="section-tag">Simple Process</p>
            <h2 className="section-title">How It Works</h2>
            <p style={{ color: 'var(--gray)', marginTop: '12px', maxWidth: '520px', margin: '12px auto 0' }}>
              Book your dream trip in just four easy steps.
            </p>
          </div>
          <div className="svc-steps">
            {[
              { n: '01', title: 'Tell Us Your Plan', desc: 'Share your destination, dates, group size, and budget with us.' },
              { n: '02', title: 'Get a Custom Quote', desc: 'We prepare a detailed, no-obligation itinerary and price quote for you.' },
              { n: '03', title: 'Confirm & Pay', desc: 'Finalise your booking with a simple advance payment. Rest is on us.' },
              { n: '04', title: 'Enjoy the Trip', desc: 'Travel stress-free — our team is available 24/7 throughout your journey.' },
            ].map((step, i) => (
              <div key={i} className="svc-step">
                <div className="svc-step-num">{step.n}</div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="section" style={{ paddingTop: 0, paddingBottom: '80px' }}>
          <div className="svc-cta-banner">
            <div>
              <h2>Ready to plan your Kashmir trip?</h2>
              <p>Call us or send a message — our travel experts respond within minutes.</p>
            </div>
            <div className="svc-cta-btns">
              <a href="tel:+919149406965" className="svc-cta-primary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 11.1a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9a16 16 0 0 0 6.93 6.93l1.85-1.85a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 18h-.08z"/></svg>
                +91 9149406965
              </a>
              <Link to="/contact" className="svc-cta-secondary">Send Enquiry</Link>
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </div>
  );
};

export default Services;
