import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import PhotoGalery from './pages/pht';

import Specials from './pages/Specials';
import './App.css';
import Services from './pages/Services';
import './style/header.css';
import { FaClinicMedical } from 'react-icons/fa';
import { FaVk, FaTelegram, FaYoutube, FaWhatsapp } from 'react-icons/fa';

function App() {
  const socialLinks = [
    { name: 'VK', url: 'https://vk.com', icon: <FaVk /> },
    { name: 'Telegram', url: 'https://telegram.org', icon: <FaTelegram /> },
    { name: 'YouTube', url: 'https://youtube.com', icon: <FaYoutube /> },
    { name: 'WhatsApp', url: 'https://whatsapp.com', icon: <FaWhatsapp /> },
  ];

  return (
    <Router>
      <header className="App-header">
        <div className="nav-container">
          <Link to="/">
            <div className="clinic-logo">
              <FaClinicMedical />
              <p className="header-text">КЛИНИКА ФОМИНА</p>
            </div>
          </Link>

          <nav className="main-nav">
            <Link to="/">Главная</Link>
            <Link to="/Services">Услуги</Link>
            <Link to="/PhotoGalery">Фотогалерея</Link>
            <Link to="/Specials">Акции</Link>
          </nav>

          <Link to="/Services">
            <button className="record-button">Записаться</button>
          </Link>
        </div>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Services" element={<Services />} />
          <Route path="/PhotoGalery" element={<PhotoGalery />} />
          <Route path="/Specials" element={<Specials />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <ul className="footer-socials">
            {socialLinks.map((social, index) => (
              <li key={index} className="footer-social-item">
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              </li>
            ))}
          </ul>
          <ul className="footer-menu">
            <Link to="/Services">
              <li className="footer-menu-element">Записаться к врачу</li>
            </Link>
            
            
          </ul>
          <div className="footer-contacts">
            <span>23 филиала в России</span>
            <span>г.Калининград</span>
            <span>+7 (911) 421-44-45</span>
          </div>
          <div className="footer-copyright">
            <p>© {new Date().getFullYear()} Клиника Фомина</p>
            
          </div>
        </div>
      </footer>
    </Router>
  );
}

export default App;