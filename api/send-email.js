// Uses Resend (https://resend.com) — free tier: 100 emails/day, 3000/month
// Set RESEND_API_KEY in Vercel env vars after signing up at resend.com
//
// Free tier sender: "Shera Travels <onboarding@resend.dev>"  (works without domain verification)
// To send from sheratravels21@gmail.com or info@sheratravelsxr.com → verify domain in Resend dashboard

const RESEND_API_KEY  = process.env.RESEND_API_KEY || 're_KRBJ2MB9_2v4u5Sgan5EdNUQjhGV6Cqhb'
const ADMIN_EMAIL     = process.env.ADMIN_EMAIL || 'sheratravels21@gmail.com'
const OWNER_EMAIL     = process.env.OWNER_EMAIL || 'sheratravels21@gmail.com'
const FROM_EMAIL      = process.env.FROM_EMAIL  || 'onboarding@resend.dev'
const FROM_NAME       = 'Shera Travels'
const REPLY_TO        = 'sheratravels21@gmail.com'
const SUPABASE_URL    = process.env.SUPABASE_URL || 'https://puufrlhhdjsqnbseayvh.supabase.co'
const SUPABASE_ANON   = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1dWZybGhoZGpzcW5ic2VheXZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyNzIxNzMsImV4cCI6MjA5MTg0ODE3M30.yByTKkvnlWV5MNAT8Coo2PUKhBOeQWxgtIFdSsd3hbg'

async function supabaseInsert(table, row) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_ANON,
      'Authorization': `Bearer ${SUPABASE_ANON}`,
      'Prefer': 'return=representation',
    },
    body: JSON.stringify(row),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data?.message || JSON.stringify(data))
  return Array.isArray(data) ? data[0] : data
}

const fmt = (n) => `₹${Number(n || 0).toLocaleString('en-IN')}`

async function sendViaResend({ to, subject, html }) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from:     `${FROM_NAME} <${FROM_EMAIL}>`,
      reply_to: REPLY_TO,
      to:       Array.isArray(to) ? to : [to],
      subject,
      html,
    }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || data.name || JSON.stringify(data))
  return data
}

// ── Admin / Employee notification HTML ──────────────────────
function adminNotificationHTML({ type, booking, payment }) {
  const isNewBooking = type === 'new_booking'
  const accentColor  = isNewBooking ? '#6366F1' : '#10B981'
  const icon         = isNewBooking ? '📋' : '💰'
  const title        = isNewBooking ? 'New Booking Created!' : 'Payment Received!'

  const paidAmt  = Number(booking.paid_amount  || payment?.amount || 0)
  const totalAmt = Number(booking.total_amount || 0)
  const balance  = Math.max(0, totalAmt - paidAmt)

  return `
<!DOCTYPE html><html>
<head><meta charset="UTF-8"/>
<style>
  body { font-family: Inter,Arial,sans-serif; background:#F1F5F9; margin:0; padding:20px; color:#0F172A; }
  .wrap { max-width:600px; margin:0 auto; background:#fff; border-radius:16px; overflow:hidden; box-shadow:0 4px 24px rgba(0,0,0,0.08); }
  .header { background:${accentColor}; padding:28px 32px; color:#fff; }
  .header h1 { margin:0 0 4px; font-size:22px; font-weight:900; }
  .header p  { margin:0; opacity:0.85; font-size:13px; }
  .section  { padding:20px 32px; border-bottom:1px solid #E2E8F0; }
  .section:last-of-type { border-bottom:none; }
  .sec-title { font-size:10px; font-weight:800; color:#94A3B8; text-transform:uppercase; letter-spacing:1px; margin-bottom:12px; }
  .row { display:flex; justify-content:space-between; margin-bottom:8px; font-size:13px; }
  .label { color:#64748B; }
  .val   { font-weight:700; color:#0F172A; }
  .amount-grid { display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px; margin-top:4px; }
  .amt-box { background:#F8FAFC; border-radius:10px; padding:14px; text-align:center; border:1px solid #E2E8F0; }
  .amt-label { font-size:10px; font-weight:700; color:#94A3B8; text-transform:uppercase; margin-bottom:6px; }
  .amt-val   { font-size:20px; font-weight:900; }
  .paid-color    { color:#10B981; }
  .balance-color { color:#F59E0B; }
  .total-color   { color:#6366F1; }
  .crm-btn { display:block; background:${accentColor}; color:#fff; text-decoration:none; text-align:center; padding:14px 24px; font-weight:800; font-size:14px; margin:20px 32px; border-radius:12px; }
  .footer { background:#F8FAFC; padding:16px 32px; text-align:center; font-size:11px; color:#94A3B8; }
</style>
</head>
<body>
<div class="wrap">
  <div class="header">
    <h1>${icon} ${title}</h1>
    <p>${new Date().toLocaleString('en-IN', { day:'numeric', month:'long', year:'numeric', hour:'2-digit', minute:'2-digit' })}</p>
  </div>

  <div class="section">
    <div class="sec-title">Customer Details</div>
    <div class="row"><span class="label">Name</span><span class="val">${booking.customer_name || '—'}</span></div>
    <div class="row"><span class="label">Phone</span><span class="val">${booking.customer_phone || '—'}</span></div>
    <div class="row"><span class="label">WhatsApp</span><span class="val">${booking.customer_whatsapp || booking.customer_phone || '—'}</span></div>
    <div class="row"><span class="label">Email</span><span class="val">${booking.customer_email || '—'}</span></div>
  </div>

  <div class="section">
    <div class="sec-title">Booking Details</div>
    <div class="row"><span class="label">Booking Ref</span><span class="val" style="color:#6366F1">${booking.booking_ref || '—'}</span></div>
    <div class="row"><span class="label">Destination</span><span class="val">${booking.destination || '—'}</span></div>
    <div class="row"><span class="label">Travel Date</span><span class="val">${booking.travel_date ? new Date(booking.travel_date).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'}) : '—'}</span></div>
    <div class="row"><span class="label">Return Date</span><span class="val">${booking.return_date ? new Date(booking.return_date).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'}) : '—'}</span></div>
    <div class="row"><span class="label">Passengers</span><span class="val">${booking.adults||0} Adults${booking.children ? `, ${booking.children} Children` : ''}${booking.infants ? `, ${booking.infants} Infants` : ''}</span></div>
    ${payment ? `<div class="row"><span class="label">Payment Method</span><span class="val" style="text-transform:capitalize">${payment.method || 'Razorpay'}</span></div>` : ''}
  </div>

  <div class="section">
    <div class="sec-title">Payment Summary</div>
    <div class="amount-grid">
      <div class="amt-box">
        <div class="amt-label">Total Amount</div>
        <div class="amt-val total-color">${fmt(totalAmt)}</div>
      </div>
      <div class="amt-box">
        <div class="amt-label">Paid ${payment ? 'Now' : 'So Far'}</div>
        <div class="amt-val paid-color">${fmt(payment?.amount || paidAmt)}</div>
      </div>
      <div class="amt-box">
        <div class="amt-label">Balance Due</div>
        <div class="amt-val balance-color">${fmt(balance)}</div>
      </div>
    </div>
    ${payment?.razorpay_payment_id ? `<div class="row" style="margin-top:12px"><span class="label">Razorpay ID</span><span class="val" style="font-size:11px">${payment.razorpay_payment_id}</span></div>` : ''}
  </div>

  <a href="https://sheratravelsxr.com/crm/bookings" class="crm-btn">
    Open CRM Dashboard →
  </a>

  <div class="footer">
    Shera Travels CRM • Auto-notification system
  </div>
</div>
</body></html>`
}

// ── Invoice HTML (customer-facing full invoice) ──────────────
function invoiceHTML({ booking, payments = [], paidTotal = 0, balance = 0, pkg = null }) {
  const fmt   = (n) => `₹${Number(n || 0).toLocaleString('en-IN')}`
  const fmtDt = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' }) : '—'
  const invoiceNo = `INV-${(booking?.booking_ref || 'ST').replace('ST-','')}-${new Date().getFullYear()}`
  const issueDate = new Date().toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' })
  const fullyPaid = balance <= 0
  const pkgName   = pkg?.title || (booking?.destination ? `${booking.destination} Tour Package` : 'Kashmir Tour Package')
  const pkgMeta   = [pkg?.nights ? `${pkg.nights}N/${Number(pkg.nights)+1}D` : null, booking?.booking_ref].filter(Boolean).join(' · ')

  const payRows = payments.map((p, i) => `
    <tr style="border-bottom:1px solid #F1F5F9;">
      <td style="padding:12px 16px;font-size:13px;color:#64748b;">${String(i+1).padStart(2,'0')}</td>
      <td style="padding:12px 16px;font-size:13px;color:#334155;">${fmtDt(p.paid_at || p.created_at)}</td>
      <td style="padding:12px 16px;font-size:13px;color:#334155;text-transform:capitalize;">${p.method || 'Razorpay'}</td>
      <td style="padding:12px 16px;font-size:13px;color:#334155;">${p.type === 'balance' ? 'Balance' : 'Advance'}</td>
      <td style="padding:12px 16px;font-size:13px;font-weight:700;color:#059669;text-align:right;">${fmt(p.amount)}</td>
    </tr>`).join('')

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Invoice — ${invoiceNo}</title>
</head>
<body style="margin:0;padding:0;background:#EEF2FF;font-family:'Helvetica Neue',Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#EEF2FF;padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 8px 40px rgba(79,110,247,.12);">

  <!-- TOP STRIPE -->
  <tr><td style="background:linear-gradient(90deg,#4F6EF7 0%,#7C3AED 100%);height:6px;"></td></tr>

  <!-- HEADER -->
  <tr>
    <td style="padding:36px 40px 28px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td>
            <img src="https://www.sheratravelsxr.com/crm/logo.png" alt="Shera Travels" style="height:60px;width:auto;display:block;margin-bottom:8px;" />
            <div style="font-size:13px;color:#64748B;margin-top:2px;">Kashmir Tourism · Budgam, J&K, India</div>
            <div style="font-size:13px;color:#64748B;">📞 +91-9149406965 &nbsp;·&nbsp; sheratravels21@gmail.com</div>
          </td>
          <td align="right" valign="top">
            <div style="background:#EEF2FF;border-radius:12px;padding:16px 20px;display:inline-block;text-align:right;">
              <div style="font-size:11px;font-weight:800;color:#6366F1;text-transform:uppercase;letter-spacing:1px;">INVOICE</div>
              <div style="font-size:18px;font-weight:900;color:#1E293B;margin-top:4px;">${invoiceNo}</div>
              <div style="font-size:12px;color:#64748B;margin-top:4px;">${issueDate}</div>
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- DIVIDER -->
  <tr><td style="padding:0 40px;"><div style="height:1px;background:#E2E8F0;"></div></td></tr>

  <!-- BILLED TO + TRIP INFO -->
  <tr>
    <td style="padding:28px 40px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td width="48%" valign="top">
            <div style="font-size:11px;font-weight:800;color:#6366F1;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">BILLED TO</div>
            <div style="font-size:16px;font-weight:800;color:#1E293B;">${booking?.customer_name || '—'}</div>
            <div style="font-size:13px;color:#64748B;margin-top:4px;">${booking?.customer_phone || ''}</div>
            <div style="font-size:13px;color:#64748B;">${booking?.customer_email || ''}</div>
          </td>
          <td width="4%"></td>
          <td width="48%" valign="top">
            <div style="font-size:11px;font-weight:800;color:#6366F1;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">TRIP DETAILS</div>
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="font-size:12px;color:#94A3B8;padding-bottom:6px;padding-right:12px;">Destination</td>
                <td style="font-size:13px;font-weight:700;color:#1E293B;padding-bottom:6px;">${booking?.destination || '—'}</td>
              </tr>
              <tr>
                <td style="font-size:12px;color:#94A3B8;padding-bottom:6px;padding-right:12px;">Travel Date</td>
                <td style="font-size:13px;font-weight:700;color:#1E293B;padding-bottom:6px;">${fmtDt(booking?.travel_date)}</td>
              </tr>
              <tr>
                <td style="font-size:12px;color:#94A3B8;padding-bottom:6px;padding-right:12px;">Return Date</td>
                <td style="font-size:13px;font-weight:700;color:#1E293B;padding-bottom:6px;">${fmtDt(booking?.return_date)}</td>
              </tr>
              <tr>
                <td style="font-size:12px;color:#94A3B8;padding-right:12px;">Pax</td>
                <td style="font-size:13px;font-weight:700;color:#1E293B;">${booking?.adults||1} Adults${booking?.children ? `, ${booking.children} Children` : ''}${booking?.infants ? `, ${booking.infants} Infants` : ''}</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- PACKAGE ROW -->
  <tr>
    <td style="padding:0 40px 28px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:12px;overflow:hidden;border:1px solid #E2E8F0;">
        <tr style="background:#F8FAFC;">
          <td style="padding:12px 16px;font-size:11px;font-weight:800;color:#64748B;text-transform:uppercase;letter-spacing:.8px;">Description</td>
          <td style="padding:12px 16px;font-size:11px;font-weight:800;color:#64748B;text-transform:uppercase;letter-spacing:.8px;text-align:right;">Amount</td>
        </tr>
        <tr>
          <td style="padding:16px;font-size:14px;color:#334155;">
            <div style="font-weight:700;color:#1E293B;">${pkgName}</div>
            <div style="font-size:12px;color:#94A3B8;margin-top:3px;">${pkgMeta}</div>
          </td>
          <td style="padding:16px;font-size:15px;font-weight:800;color:#1E293B;text-align:right;">${fmt(booking?.total_amount)}</td>
        </tr>
      </table>
    </td>
  </tr>

  ${payments.length > 0 ? `
  <!-- PAYMENT HISTORY -->
  <tr>
    <td style="padding:0 40px 28px;">
      <div style="font-size:11px;font-weight:800;color:#6366F1;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">PAYMENT HISTORY</div>
      <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:12px;overflow:hidden;border:1px solid #E2E8F0;">
        <tr style="background:#F8FAFC;">
          <th style="padding:10px 16px;font-size:11px;font-weight:800;color:#64748B;text-transform:uppercase;text-align:left;">#</th>
          <th style="padding:10px 16px;font-size:11px;font-weight:800;color:#64748B;text-transform:uppercase;text-align:left;">Date</th>
          <th style="padding:10px 16px;font-size:11px;font-weight:800;color:#64748B;text-transform:uppercase;text-align:left;">Method</th>
          <th style="padding:10px 16px;font-size:11px;font-weight:800;color:#64748B;text-transform:uppercase;text-align:left;">Type</th>
          <th style="padding:10px 16px;font-size:11px;font-weight:800;color:#64748B;text-transform:uppercase;text-align:right;">Amount</th>
        </tr>
        ${payRows}
      </table>
    </td>
  </tr>` : ''}

  <!-- TOTALS -->
  <tr>
    <td style="padding:0 40px 32px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td width="55%"></td>
          <td width="45%">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8FAFC;border-radius:12px;overflow:hidden;">
              <tr style="border-bottom:1px solid #E2E8F0;">
                <td style="padding:12px 16px;font-size:13px;color:#64748B;">Package Total</td>
                <td style="padding:12px 16px;font-size:13px;font-weight:700;color:#1E293B;text-align:right;">${fmt(booking?.total_amount)}</td>
              </tr>
              <tr style="border-bottom:1px solid #E2E8F0;">
                <td style="padding:12px 16px;font-size:13px;color:#64748B;">Total Paid</td>
                <td style="padding:12px 16px;font-size:13px;font-weight:700;color:#059669;text-align:right;">${fmt(paidTotal)}</td>
              </tr>
              <tr style="background:${fullyPaid ? '#ECFDF5' : '#FFF7ED'};">
                <td style="padding:14px 16px;font-size:14px;font-weight:800;color:${fullyPaid ? '#059669' : '#D97706'};">Balance Due</td>
                <td style="padding:14px 16px;font-size:16px;font-weight:900;color:${fullyPaid ? '#059669' : '#D97706'};text-align:right;">${fmt(balance)}</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- STATUS BADGE -->
  <tr>
    <td style="padding:0 40px 32px;text-align:center;">
      <div style="display:inline-block;padding:10px 28px;border-radius:100px;background:${fullyPaid ? '#ECFDF5' : '#FFF7ED'};border:2px solid ${fullyPaid ? '#6EE7B7' : '#FCD34D'};">
        <span style="font-size:14px;font-weight:800;color:${fullyPaid ? '#059669' : '#D97706'};">
          ${fullyPaid ? '✅ Fully Paid — Thank you!' : `⏳ Balance Due: ${fmt(balance)}`}
        </span>
      </div>
    </td>
  </tr>

  <!-- BOTTOM STRIPE + FOOTER -->
  <tr><td style="background:linear-gradient(90deg,#4F6EF7 0%,#7C3AED 100%);height:4px;"></td></tr>
  <tr>
    <td style="padding:20px 40px;background:#F8FAFC;text-align:center;">
      <div style="font-size:12px;color:#94A3B8;line-height:1.8;">
        <strong style="color:#475569;">Shera Travels</strong> &nbsp;·&nbsp; Budgam, Jammu &amp; Kashmir, India<br/>
        📞 +91-9149406965 &nbsp;·&nbsp; ✉ sheratravels21@gmail.com<br/>
        <em style="font-size:11px;">Thank you for choosing Shera Travels — your Kashmir journey awaits!</em>
      </div>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>`
}

// ── New Booking Confirmation HTML (customer-facing) ──────────
function bookingConfirmationHTML({ booking }) {
  const advance = Number(booking.advance_amount || 0)
  const balance = Number(booking.balance_amount || Math.max(0, Number(booking.total_amount || 0) - advance))
  const now = new Date().toLocaleString('en-IN', { day:'numeric', month:'long', year:'numeric', hour:'2-digit', minute:'2-digit' })

  return `
<!DOCTYPE html><html>
<head><meta charset="UTF-8"/>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:Inter,Arial,sans-serif;background:#F1F5F9;color:#0F172A;padding:20px}
  .wrap{max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08)}
  .header{background:linear-gradient(135deg,#4F6EF7,#6366F1);padding:32px;color:#fff;text-align:center}
  .icon{width:72px;height:72px;background:rgba(255,255,255,.2);border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:36px;margin-bottom:16px}
  .header h1{font-size:26px;font-weight:900;margin-bottom:4px}
  .header p{opacity:.85;font-size:13px}
  .section{padding:22px 32px;border-bottom:1px solid #E2E8F0}
  .section:last-of-type{border-bottom:none}
  .sec-title{font-size:10px;font-weight:800;color:#94A3B8;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px}
  .row{display:flex;justify-content:space-between;margin-bottom:8px;font-size:14px}
  .label{color:#64748B}.val{font-weight:700}
  .ref-box{background:#EEF2FF;border-radius:10px;padding:14px 20px;text-align:center;margin-top:12px}
  .ref-num{font-size:22px;font-weight:900;color:#4F6EF7;letter-spacing:1px}
  .amount-box{background:#F8FAFC;border-radius:12px;padding:16px 20px}
  .a-row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #E2E8F0;font-size:14px}
  .a-row:last-child{border-bottom:none;padding-top:12px}
  .green{color:#10B981;font-weight:800}.yellow{color:#F59E0B;font-weight:800}.purple{color:#6366F1;font-weight:800}
  .footer{background:#F8FAFC;padding:20px 32px;text-align:center;font-size:12px;color:#94A3B8}
</style></head>
<body><div class="wrap">
  <div class="header">
    <div class="icon">✈️</div>
    <h1>Booking Confirmed!</h1>
    <p>${now}</p>
  </div>
  <div class="section">
    <p style="font-size:14px;color:#334155;line-height:1.8">
      Dear <strong>${booking.customer_name || 'Traveller'}</strong>,<br/>
      Your trip with <strong>Shera Travels</strong> is confirmed! We're excited to make your journey memorable. Please save this email for your records.
    </p>
    <div class="ref-box">
      <div style="font-size:10px;font-weight:700;color:#6366F1;margin-bottom:4px;text-transform:uppercase;letter-spacing:1px">Booking Reference</div>
      <div class="ref-num">${booking.booking_ref || '—'}</div>
    </div>
  </div>
  <div class="section">
    <div class="sec-title">Trip Details</div>
    <div class="row"><span class="label">Destination</span><span class="val">${booking.destination || '—'}</span></div>
    <div class="row"><span class="label">Travel Date</span><span class="val">${booking.travel_date ? new Date(booking.travel_date).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'}) : '—'}</span></div>
    <div class="row"><span class="label">Return Date</span><span class="val">${booking.return_date ? new Date(booking.return_date).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'}) : '—'}</span></div>
    <div class="row"><span class="label">Passengers</span><span class="val">${booking.adults||0} Adults${booking.children ? `, ${booking.children} Children` : ''}${booking.infants ? `, ${booking.infants} Infants` : ''}</span></div>
  </div>
  <div class="section">
    <div class="sec-title">Payment Summary</div>
    <div class="amount-box">
      <div class="a-row"><span>Total Package Amount</span><span class="purple">${fmt(booking.total_amount)}</span></div>
      <div class="a-row"><span>Advance (${booking.advance_percent||20}%)</span><span class="green">${fmt(advance)}</span></div>
      <div class="a-row"><span>⏳ Balance at Check-in</span><span class="yellow">${fmt(balance)}</span></div>
    </div>
    <p style="font-size:12px;color:#94A3B8;margin-top:8px;font-style:italic">Advance secures your booking. Balance is due on or before your travel date.</p>
  </div>
  <div class="footer">
    <strong>Shera Travels</strong><br/>
    Radio Colony, Srinagar, Lawaypora, J&amp;K 190017<br/>
    📞 +91-9149406965 &nbsp;|&nbsp; ✉ sheratravels21@gmail.com<br/><br/>
    <em>Our team will be in touch shortly. Thank you for choosing Shera Travels! ✈️</em>
  </div>
</div></body></html>`
}

// ── Customer Receipt HTML ────────────────────────────────────
function customerReceiptHTML({ booking, justPaid, newPaidTotal, newBalance }) {
  const isFullyPaid = newBalance <= 0
  const now = new Date().toLocaleString('en-IN', { day:'numeric', month:'long', year:'numeric', hour:'2-digit', minute:'2-digit' })

  return `
<!DOCTYPE html><html>
<head><meta charset="UTF-8"/>
<style>
  * { box-sizing:border-box; margin:0; padding:0; }
  body { font-family:Inter,Arial,sans-serif; background:#F1F5F9; color:#0F172A; padding:20px; }
  .wrap { max-width:600px; margin:0 auto; background:#fff; border-radius:16px; overflow:hidden; box-shadow:0 4px 24px rgba(0,0,0,0.08); }
  .header { background:linear-gradient(135deg,#4F6EF7,#6366F1); padding:32px; color:#fff; text-align:center; }
  .check  { width:64px; height:64px; background:rgba(255,255,255,0.2); border-radius:50%; display:inline-flex; align-items:center; justify-content:center; font-size:28px; margin-bottom:16px; }
  .header h1 { font-size:26px; font-weight:900; margin-bottom:4px; }
  .section { padding:22px 32px; border-bottom:1px solid #E2E8F0; }
  .section:last-of-type { border-bottom:none; }
  .sec-title { font-size:10px; font-weight:800; color:#94A3B8; text-transform:uppercase; letter-spacing:1px; margin-bottom:12px; }
  .row { display:flex; justify-content:space-between; margin-bottom:8px; font-size:14px; }
  .label { color:#64748B; }
  .val   { font-weight:700; }
  .amount-box { background:#F8FAFC; border-radius:12px; padding:16px 20px; }
  .a-row { display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #E2E8F0; font-size:14px; }
  .a-row:last-child { border-bottom:none; padding-top:12px; font-size:16px; font-weight:900; }
  .paid-now { background:#F0FDF4; border-radius:8px; padding:10px 14px; margin:4px -4px; }
  .green  { color:#10B981; font-weight:800; }
  .yellow { color:#F59E0B; font-weight:800; }
  .purple { color:#6366F1; font-weight:800; }
  .badge  { display:inline-block; padding:6px 18px; border-radius:20px; font-size:13px; font-weight:800; margin-top:14px; }
  .badge-due  { background:#FEF3C7; color:#D97706; }
  .badge-paid { background:#D1FAE5; color:#059669; }
  .ref-box { background:#EEF2FF; border-radius:10px; padding:14px 20px; text-align:center; margin-top:12px; }
  .ref-num { font-size:20px; font-weight:900; color:#4F6EF7; letter-spacing:1px; }
  .footer  { background:#F8FAFC; padding:20px 32px; text-align:center; font-size:12px; color:#94A3B8; }
</style>
</head>
<body>
<div class="wrap">
  <div class="header">
    <div class="check">✓</div>
    <h1>Payment Confirmed!</h1>
    <p style="opacity:0.85;font-size:13px">${now}</p>
  </div>

  <div class="section">
    <p style="font-size:14px;color:#334155;line-height:1.8">
      Dear <strong>${booking.customer_name || 'Traveller'}</strong>,<br/>
      Thank you for your payment! We have received your amount and your booking is confirmed.
    </p>
    <div class="ref-box">
      <div style="font-size:10px;font-weight:700;color:#6366F1;margin-bottom:4px;text-transform:uppercase;letter-spacing:1px">Booking Reference</div>
      <div class="ref-num">${booking.booking_ref || '—'}</div>
    </div>
  </div>

  <div class="section">
    <div class="sec-title">Trip Details</div>
    <div class="row"><span class="label">Destination</span><span class="val">${booking.destination || '—'}</span></div>
    <div class="row"><span class="label">Travel Date</span><span class="val">${booking.travel_date ? new Date(booking.travel_date).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'}) : '—'}</span></div>
    <div class="row"><span class="label">Passengers</span><span class="val">${booking.adults||0} Adults${booking.children ? `, ${booking.children} Children` : ''}${booking.infants ? `, ${booking.infants} Infants` : ''}</span></div>
  </div>

  <div class="section">
    <div class="sec-title">Payment Receipt</div>
    <div class="amount-box">
      <div class="a-row"><span>Total Package Amount</span><span class="purple">${fmt(Number(booking.total_amount || 0))}</span></div>
      <div class="a-row paid-now"><span><strong>✅ Amount Paid (This Transaction)</strong></span><span class="green" style="font-size:18px">${fmt(justPaid)}</span></div>
      <div class="a-row"><span>Total Paid So Far</span><span class="green">${fmt(newPaidTotal)}</span></div>
      <div class="a-row"><span>${isFullyPaid ? '🎉 Trip Fully Paid' : '⏳ Balance Due (Pay at Check-in)'}</span><span class="${isFullyPaid ? 'green' : 'yellow'}">${fmt(newBalance)}</span></div>
    </div>
    <div style="text-align:center">
      <span class="badge ${isFullyPaid ? 'badge-paid' : 'badge-due'}">
        ${isFullyPaid ? '✅ Fully Confirmed — Enjoy Your Trip!' : `Remaining Balance: ${fmt(newBalance)} payable at check-in`}
      </span>
    </div>
  </div>

  <div class="footer">
    <strong>Shera Travels</strong><br/>
    Radio Colony, Srinagar, Lawaypora, J&amp;K 190017<br/>
    📞 +91-9149406965 &nbsp;|&nbsp; ✉ sheratravels21@gmail.com<br/><br/>
    <em>Please save this email as your payment receipt. Thank you for choosing Shera Travels! ✈️</em>
  </div>
</div>
</body></html>`
}

// ── New Lead / Booking Inquiry HTML (from Packages page "Book Now") ─
function newLeadHTML({ contact }) {
  const now = new Date().toLocaleString('en-IN', { day:'numeric', month:'long', year:'numeric', hour:'2-digit', minute:'2-digit' })
  return `
<!DOCTYPE html><html>
<head><meta charset="UTF-8"/>
<style>
  body{font-family:Inter,Arial,sans-serif;background:#F1F5F9;margin:0;padding:20px;color:#0F172A}
  .wrap{max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08)}
  .header{background:linear-gradient(135deg,#F59E0B,#EF4444);padding:28px 32px;color:#fff}
  .header h1{margin:0 0 4px;font-size:22px;font-weight:900}
  .header p{margin:0;opacity:.85;font-size:13px}
  .section{padding:20px 32px;border-bottom:1px solid #E2E8F0}
  .section:last-of-type{border-bottom:none}
  .sec-title{font-size:10px;font-weight:800;color:#94A3B8;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px}
  .row{display:flex;justify-content:space-between;margin-bottom:8px;font-size:13px}
  .label{color:#64748B}.val{font-weight:700;color:#0F172A}
  .highlight{background:#FEF3C7;border-radius:10px;padding:14px 20px;margin-top:8px;border-left:4px solid #F59E0B}
  .crm-btn{display:block;background:#4F6EF7;color:#fff;text-decoration:none;text-align:center;padding:14px 24px;font-weight:800;font-size:14px;margin:20px 32px;border-radius:12px}
  .footer{background:#F8FAFC;padding:16px 32px;text-align:center;font-size:11px;color:#94A3B8}
</style>
</head>
<body><div class="wrap">
  <div class="header">
    <h1>🔥 New Booking Inquiry!</h1>
    <p>${now}</p>
  </div>
  <div class="section">
    <div class="highlight">
      <strong style="font-size:15px">📦 ${contact.package || 'Kashmir Tour'}</strong>
      ${contact.price ? `<div style="font-size:13px;color:#92400E;margin-top:4px">💰 Price: ${contact.price}</div>` : ''}
    </div>
  </div>
  <div class="section">
    <div class="sec-title">Customer Details</div>
    <div class="row"><span class="label">Name</span><span class="val">${contact.name || '—'}</span></div>
    <div class="row"><span class="label">Email</span><span class="val">${contact.email || '—'}</span></div>
    <div class="row"><span class="label">Phone</span><span class="val">${contact.phone || '—'}</span></div>
    <div class="row"><span class="label">Travel Date</span><span class="val">${contact.travel_date || '—'}</span></div>
    <div class="row"><span class="label">Guests</span><span class="val">${contact.guests || '—'}</span></div>
    ${contact.message ? `<div class="row"><span class="label">Message</span><span class="val">${contact.message}</span></div>` : ''}
  </div>
  <a href="https://sheratravelsxr.com/crm/leads" class="crm-btn">Open CRM → Add as Lead</a>
  <div class="footer">Shera Travels Website • Booking Inquiry Alert</div>
</div></body></html>`
}

// ── Contact Form Notification HTML ───────────────────────────
function contactFormHTML({ contact }) {
  const now = new Date().toLocaleString('en-IN', { day:'numeric', month:'long', year:'numeric', hour:'2-digit', minute:'2-digit' })
  return `
<!DOCTYPE html><html>
<head><meta charset="UTF-8"/>
<style>
  body{font-family:Inter,Arial,sans-serif;background:#F1F5F9;margin:0;padding:20px;color:#0F172A}
  .wrap{max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08)}
  .header{background:#6366F1;padding:28px 32px;color:#fff}
  .header h1{margin:0 0 4px;font-size:22px;font-weight:900}
  .header p{margin:0;opacity:.85;font-size:13px}
  .section{padding:20px 32px;border-bottom:1px solid #E2E8F0}
  .section:last-of-type{border-bottom:none}
  .sec-title{font-size:10px;font-weight:800;color:#94A3B8;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px}
  .row{display:flex;justify-content:space-between;margin-bottom:8px;font-size:13px}
  .label{color:#64748B}.val{font-weight:700;color:#0F172A}
  .msg-box{background:#F8FAFC;border-radius:10px;padding:16px;font-size:14px;line-height:1.7;color:#334155;border-left:4px solid #6366F1}
  .footer{background:#F8FAFC;padding:16px 32px;text-align:center;font-size:11px;color:#94A3B8}
</style>
</head>
<body><div class="wrap">
  <div class="header">
    <h1>📩 New Contact Form Submission</h1>
    <p>${now}</p>
  </div>
  <div class="section">
    <div class="sec-title">Sender Details</div>
    <div class="row"><span class="label">Name</span><span class="val">${contact.name || '—'}</span></div>
    <div class="row"><span class="label">Email</span><span class="val">${contact.email || '—'}</span></div>
    <div class="row"><span class="label">Phone</span><span class="val">${contact.phone || '—'}</span></div>
    <div class="row"><span class="label">Subject</span><span class="val">${contact.subject || '—'}</span></div>
  </div>
  <div class="section">
    <div class="sec-title">Message</div>
    <div class="msg-box">${(contact.message || '').replace(/\n/g, '<br/>')}</div>
  </div>
  <div class="footer">
    Shera Travels Website • Contact Form
  </div>
</div></body></html>`
}

// ── Main handler ─────────────────────────────────────────────
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  console.log('[send-email] RESEND_API_KEY set:', !!RESEND_API_KEY, '| ADMIN:', ADMIN_EMAIL)

  if (!RESEND_API_KEY) {
    return res.status(500).json({ error: 'RESEND_API_KEY not set. Sign up at resend.com (free) and add the key to Vercel env vars.' })
  }

  const { type, booking, payment, justPaid, newPaidTotal, newBalance, contact } = req.body

  // ── Website booking (Razorpay success on public site) ────
  // Save to Supabase so CRM shows it automatically
  if (type === 'website_booking' && booking) {
    try {
      const year = new Date().getFullYear()
      const rand = Math.floor(1000 + Math.random() * 9000)
      const bookingRef = `ST-${year}-W${rand}`

      const advAmt = Number(booking.paid_amount || 0)
      const totalAmt = Number(booking.total_amount || 0)

      const newBooking = await supabaseInsert('bookings', {
        booking_ref:      bookingRef,
        customer_name:    booking.customer_name,
        customer_email:   booking.customer_email || '',
        customer_phone:   booking.customer_phone || '',
        destination:      booking.destination || 'Kashmir',
        travel_date:      booking.travel_date || null,
        adults:           Number(booking.adults || 1),
        total_amount:     totalAmt,
        advance_amount:   advAmt,
        paid_amount:      advAmt,
        status:           advAmt >= totalAmt ? 'fully_paid' : 'advance_paid',
        notes:            `Online booking via website. Razorpay ID: ${booking.booking_ref || payment?.razorpay_payment_id || ''}`,
      })

      if (newBooking?.id) {
        await supabaseInsert('payments', {
          booking_id:          newBooking.id,
          amount:              advAmt,
          type:                'advance',
          method:              'razorpay',
          razorpay_payment_id: booking.booking_ref || payment?.razorpay_payment_id || null,
          status:              'success',
          notes:               'Online payment via website',
        }).catch(e => console.warn('Payment insert failed:', e.message))
      }
    } catch (e) {
      console.warn('Supabase website_booking save failed:', e.message)
    }
  }

  // ── website_booking → treat same as new_booking for email ─
  const resolvedType = type === 'website_booking' ? 'new_booking' : type

  // ── New Lead (Packages page "Book Now" form) ─────────────
  if (type === 'new_lead') {
    if (!contact) return res.status(400).json({ error: 'contact data required' })
    try {
      await sendViaResend({
        to:      ADMIN_EMAIL,
        subject: `🔥 New Inquiry — ${contact.package || 'Kashmir Tour'} | ${contact.name} | ${contact.phone}`,
        html:    newLeadHTML({ contact }),
      })
      return res.status(200).json({ success: true, sent: [`admin: ${ADMIN_EMAIL}`] })
    } catch (err) {
      console.error('Lead email error:', err)
      return res.status(500).json({ error: err.message })
    }
  }

  // ── Itinerary email (customer + admin copy) ─────────────
  if (type === 'itinerary') {
    if (!booking?.customer_email) return res.status(400).json({ error: 'customer_email required' })
    const { pkg = {}, days = [], prices = [] } = req.body
    const sent = []
    const itinSubject = `Your Personalised Itinerary — ${booking.destination || 'Kashmir'} | Shera Travels`
    const itinHtml    = itineraryHTML(booking, pkg, days, prices)
    try {
      await sendViaResend({ to: booking.customer_email, subject: itinSubject, html: itinHtml })
      sent.push(`customer: ${booking.customer_email}`)
    } catch (err) {
      console.warn('Itinerary customer email failed:', err.message)
      sent.push(`customer_failed: ${err.message}`)
    }
    // Always send a copy to admin so they know it was requested
    try {
      await sendViaResend({
        to:      ADMIN_EMAIL,
        subject: `📄 Itinerary Sent — ${booking.destination || 'Kashmir'} | ${booking.customer_name}`,
        html:    itinHtml,
      })
      sent.push(`admin: ${ADMIN_EMAIL}`)
    } catch (err) {
      console.warn('Itinerary admin copy failed:', err.message)
    }
    return res.status(200).json({ success: true, sent })
  }

  // ── Invoice email (customer + admin) ────────────────────
  if (type === 'invoice') {
    const { payments: pmts = [], pkg = null } = req.body
    const paidTotal = pmts.reduce((s, p) => s + Number(p.amount || 0), 0)
    const balance   = Math.max(0, Number(booking?.total_amount || 0) - paidTotal)
    const html = invoiceHTML({ booking, payments: pmts, paidTotal, balance, pkg })
    const sent = []
    if (booking?.customer_email) {
      try {
        await sendViaResend({
          to:      booking.customer_email,
          subject: `🧾 Invoice — ${booking.booking_ref || 'Booking'} | Shera Travels`,
          html,
        })
        sent.push(`customer: ${booking.customer_email}`)
      } catch (err) {
        console.warn('Invoice customer email failed:', err.message)
        sent.push(`customer_failed: ${err.message}`)
      }
    }
    try {
      await sendViaResend({
        to:      ADMIN_EMAIL,
        subject: `🧾 Invoice Sent — ${booking?.booking_ref || ''} | ${booking?.customer_name}`,
        html,
      })
      sent.push(`admin: ${ADMIN_EMAIL}`)
    } catch (err) {
      console.warn('Invoice admin copy failed:', err.message)
    }
    return res.status(200).json({ success: true, sent })
  }

  // ── Contact form ─────────────────────────────────────────
  if (resolvedType === 'contact') {
    if (!contact) return res.status(400).json({ error: 'contact data required' })
    try {
      await sendViaResend({
        to:      ADMIN_EMAIL,
        subject: `📩 Website Enquiry — ${contact.subject || 'Contact Form'} | ${contact.name}`,
        html:    contactFormHTML({ contact }),
      })
      return res.status(200).json({ success: true, sent: [`admin: ${ADMIN_EMAIL}`] })
    } catch (err) {
      console.error('Contact email error:', err)
      return res.status(500).json({ error: err.message })
    }
  }

  if (!booking) return res.status(400).json({ error: 'booking data required' })

  try {
    const sent = []

    // ── 1. Customer email ────────────────────────────────────
    // ── 1. Customer email (non-blocking — may fail if domain not verified) ─
    if (booking.customer_email) {
      let subject, html
      if (resolvedType === 'new_booking') {
        subject = `✈️ Booking Confirmed — ${booking.booking_ref} | Shera Travels`
        html    = bookingConfirmationHTML({ booking })
      } else if (justPaid != null) {
        subject = `Payment Receipt — ${booking.booking_ref} | Shera Travels`
        html    = customerReceiptHTML({ booking, justPaid, newPaidTotal, newBalance })
      }
      if (html) {
        try {
          await sendViaResend({ to: booking.customer_email, subject, html })
          sent.push(`customer: ${booking.customer_email}`)
        } catch (custErr) {
          console.warn('Customer email failed (domain may not be verified):', custErr.message)
          sent.push(`customer_failed: ${custErr.message}`)
        }
      }
    }

    // ── 2. Admin notification ────────────────────────────────
    if (ADMIN_EMAIL) {
      const subject = resolvedType === 'new_booking'
        ? `📋 New Booking — ${booking.booking_ref} | ${booking.customer_name}`
        : `💰 Payment Received — ${booking.booking_ref} | ${fmt(payment?.amount || justPaid)} | ${booking.customer_name}`
      try {
        await sendViaResend({
          to:      ADMIN_EMAIL,
          subject,
          html:    adminNotificationHTML({ type: resolvedType || 'payment', booking, payment: payment || { amount: justPaid } }),
        })
        sent.push(`admin: ${ADMIN_EMAIL}`)
      } catch (adminErr) {
        console.error('Admin email failed:', adminErr.message)
        sent.push(`admin_failed: ${adminErr.message}`)
      }
    }

    // ── 3. Owner (if different from admin) ───────────────────
    if (OWNER_EMAIL && OWNER_EMAIL !== ADMIN_EMAIL) {
      const subject = resolvedType === 'new_booking'
        ? `📋 New Booking — ${booking.booking_ref} | ${booking.customer_name}`
        : `💰 Payment — ${booking.booking_ref} | ${fmt(payment?.amount || justPaid)}`
      try {
        await sendViaResend({
          to:      OWNER_EMAIL,
          subject,
          html:    adminNotificationHTML({ type: resolvedType || 'payment', booking, payment: payment || { amount: justPaid } }),
        })
        sent.push(`owner: ${OWNER_EMAIL}`)
      } catch (ownerErr) {
        console.warn('Owner email failed:', ownerErr.message)
      }
    }

    return res.status(200).json({ success: true, sent })
  } catch (err) {
    console.error('Email error:', err)
    return res.status(500).json({ error: err.message })
  }
}
