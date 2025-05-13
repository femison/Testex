import React from 'react';
import '../style/Home.css';
import { FaClinicMedical, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="home-page">
      {/* Шапка с логотипом */}
      <header className="main-header">
        <div className="logo-container">
          <h1 className="logo">КЛИНИКА <span>ФОМИНА</span></h1>
          <p className="slogan">Сеть многопрофильных клиник доказательной медицины</p>
        </div>
      </header>

      {/* Основное меню */}
      <nav className="main-nav">
        <div className="patient-categories">
          <button className="patient-btn">мужчинам</button>
          <button className="patient-btn">женщинам</button>
          <button className="patient-btn">детям</button>
        </div>
      </nav>

      
      <main className="main-content">
        <div className="content-wrapper">
          <section className="info-section">
            <h2>Сеть частных клиник</h2>
            <div className="features">
              <div className="feature">
                <FaClinicMedical className="feature-icon" />
                <span>23 филиала в России</span>
              </div>
              <div className="feature">
                <FaMapMarkerAlt className="feature-icon" />
                <span>Москва</span>
              </div>
              <div className="feature">
                <FaPhone className="feature-icon" />
                <span>+7 (499) 283-32-21</span>
              </div>
            </div>
          </section>

          <section className="quick-links">
            <a href="/dns" className="quick-link">ДНС</a>
            <a href="/contacts" className="quick-link">Контакты</a>
            <a href="/app" className="quick-link">Приложение</a>
            <a href="/director" className="quick-link">Написать директору</a>
            <a href="/survey" className="quick-link">Национальный опрос</a>
          </section>
        </div>
      </main>

      <footer className="main-footer">
        <p>© {new Date().getFullYear()} Клиника Фомина. Все права защищены.</p>
      </footer>
    </div>
  );
};

export default Home;