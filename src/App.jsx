import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Destinations from './pages/Destinations';
import Packages from './pages/Packages';
import Services from './pages/Services';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/crm" element={<RedirectToExternal url="/crm/" />} />
      </Routes>
    </Router>
  );
}

function RedirectToExternal({ url }) {
  React.useEffect(() => {
    window.location.href = url;
  }, [url]);
  return null;
}

export default App;
