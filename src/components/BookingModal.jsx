import React, { useState } from 'react';

const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_live_SnKkk6ok7WL22P';

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) { resolve(true); return; }
    const s = document.createElement('script');
    s.src = 'https://checkout.razorpay.com/v1/checkout.js';
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

const BookingModal = ({ isOpen, onClose, destinationName, packagePrice }) => {
  const [step, setStep] = useState('form'); // 'form' | 'payment' | 'success'
  const [paying, setPaying] = useState(false);
  const [paymentRef, setPaymentRef] = useState('');
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', date: '', guests: '1', message: ''
  });

  const priceNum = packagePrice
    ? parseInt(String(packagePrice).replace(/[^0-9]/g, ''))
    : 0;
  const advanceAmt = priceNum > 0 ? Math.round(priceNum * 0.20) : 5000;
  const fmt = (n) => `₹${Number(n).toLocaleString('en-IN')}`;

  if (!isOpen) return null;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setStep('payment');
    // Fire-and-forget lead notification to admin
    fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'new_lead',
        contact: {
          name:        formData.name,
          email:       formData.email,
          phone:       formData.phone,
          travel_date: formData.date,
          guests:      formData.guests,
          message:     formData.message || '',
          subject:     `New Inquiry — ${destinationName || 'Kashmir Tour'}`,
          package:     destinationName || 'Kashmir Tour',
          price:       packagePrice || '',
        },
      }),
    }).catch(() => {});
  };

  const handlePayNow = async () => {
    setPaying(true);
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      alert('Razorpay load nahi hua. Internet check karein.');
      setPaying(false);
      return;
    }

    const options = {
      key: RAZORPAY_KEY,
      amount: advanceAmt * 100,
      currency: 'INR',
      name: 'Shera Travels',
      description: `Advance — ${destinationName || 'Kashmir Tour'}`,
      image: '/favicon.png',
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone.replace(/\D/g, ''),
      },
      notes: {
        destination: destinationName || '',
        travel_date: formData.date,
        guests: formData.guests,
      },
      theme: { color: '#2563EB' },
      modal: {
        ondismiss: () => setPaying(false),
      },
      handler: (response) => {
        setPaymentRef(response.razorpay_payment_id);
        setStep('success');
        setPaying(false);
        // Notify admin of website booking + payment
        fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'website_booking',
            booking: {
              customer_name:  formData.name,
              customer_email: formData.email,
              customer_phone: formData.phone,
              destination:    destinationName || 'Kashmir Tour',
              travel_date:    formData.date,
              adults:         formData.guests,
              total_amount:   priceNum || 0,
              paid_amount:    advanceAmt,
              booking_ref:    response.razorpay_payment_id,
            },
            payment: {
              amount:               advanceAmt,
              method:               'razorpay',
              razorpay_payment_id:  response.razorpay_payment_id,
            },
            justPaid:     advanceAmt,
            newPaidTotal: advanceAmt,
            newBalance:   Math.max(0, priceNum - advanceAmt),
          }),
        }).catch(() => {});
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', () => {
      alert('Payment failed. Dobara try karein.');
      setPaying(false);
    });
    rzp.open();
  };

  const handleClose = () => {
    setStep('form');
    setFormData({ name: '', email: '', phone: '', date: '', guests: '1', message: '' });
    setPaymentRef('');
    onClose();
  };

  return (
    <div className="modal-overlay active" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>&times;</button>

        {/* ── Step: Form ── */}
        {step === 'form' && (
          <>
            <div className="modal-header">
              <span className="section-tag">Book Your Trip</span>
              <h2>Explore {destinationName}</h2>
              <p>Fill out the form and we'll plan your perfect Kashmir journey.</p>
            </div>
            <form className="booking-form" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="name" placeholder="Enter your name" required
                  value={formData.name} onChange={handleChange} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" name="email" placeholder="name@example.com" required
                    value={formData.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" name="phone" placeholder="+91 XXXXX XXXXX" required
                    value={formData.phone} onChange={handleChange} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Travel Date</label>
                  <input type="date" name="date" required
                    value={formData.date} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Number of Guests</label>
                  <select name="guests" value={formData.guests} onChange={handleChange}>
                    {[1,2,3,4,5,6,7,8,9,'10+'].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Special Requests (Optional)</label>
                <textarea name="message" rows="2" placeholder="Anything else we should know?"
                  value={formData.message} onChange={handleChange} />
              </div>
              <button type="submit" className="submit-btn">
                Next: Payment →
              </button>
            </form>
          </>
        )}

        {/* ── Step: Payment ── */}
        {step === 'payment' && (
          <>
            <div className="modal-header">
              <span className="section-tag">Confirm & Pay</span>
              <h2>Secure Your Booking</h2>
              <p>Pay a small advance to confirm your trip. Balance due at check-in.</p>
            </div>
            <div className="payment-summary">
              <div className="pay-row">
                <span>Destination</span>
                <strong>{destinationName}</strong>
              </div>
              <div className="pay-row">
                <span>Travel Date</span>
                <strong>{formData.date}</strong>
              </div>
              <div className="pay-row">
                <span>Guests</span>
                <strong>{formData.guests}</strong>
              </div>
              {priceNum > 0 && (
                <div className="pay-row">
                  <span>Package Price</span>
                  <strong>{fmt(priceNum)}</strong>
                </div>
              )}
              <div className="pay-row pay-highlight">
                <span>Advance to Pay (20%)</span>
                <strong>{fmt(advanceAmt)}</strong>
              </div>
            </div>
            <button
              className="submit-btn"
              onClick={handlePayNow}
              disabled={paying}
              style={{ marginTop: 16 }}
            >
              {paying ? 'Opening Payment...' : `Pay ${fmt(advanceAmt)} Now →`}
            </button>
            <button
              onClick={() => setStep('form')}
              style={{ width: '100%', background: 'transparent', border: 'none', color: '#64748b', marginTop: 10, cursor: 'pointer', fontSize: 13, padding: 8 }}
            >
              ← Back to Form
            </button>
          </>
        )}

        {/* ── Step: Success ── */}
        {step === 'success' && (
          <div className="modal-success">
            <div className="success-icon">✓</div>
            <h2>Booking Confirmed!</h2>
            <p>
              Advance of <strong>{fmt(advanceAmt)}</strong> received for{' '}
              <strong>{destinationName}</strong>.
            </p>
            {paymentRef && (
              <p style={{ fontSize: 12, color: '#64748b', marginTop: 8 }}>
                Payment ID: {paymentRef}
              </p>
            )}
            <p style={{ marginTop: 12, color: '#64748b', fontSize: 14 }}>
              Our team will call you on <strong>{formData.phone}</strong> shortly to confirm details.
            </p>
            <button className="submit-btn" style={{ marginTop: 20 }} onClick={handleClose}>
              Done
            </button>
          </div>
        )}

        <style>{`
          .payment-summary {
            background: #f8fafc;
            border-radius: 12px;
            padding: 16px 20px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-top: 16px;
          }
          .pay-row {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            color: #475569;
          }
          .pay-highlight {
            padding-top: 10px;
            border-top: 1px solid #e2e8f0;
            font-size: 16px;
            font-weight: 700;
            color: #1e293b;
          }
          .pay-highlight strong { color: #2563eb; }
        `}</style>
      </div>
    </div>
  );
};

export default BookingModal;
