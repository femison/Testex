import React, { useState } from 'react';
import servicesData from '../data/servicesData.json';
import { FaArrowRight, FaCalendarAlt, FaClinicMedical, FaPhone, FaMapMarkerAlt, FaTimes } from 'react-icons/fa';
import '../style/Services.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Modal = ({ onClose, children }) => (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <FaTimes />
        </button>
        {children}
      </div>
    </div>
  );

const Services = () => {
  const [activeCategory, setActiveCategory] = useState(1);
  const currentCategory = servicesData.categories.find(c => c.id === activeCategory);
  const filteredServices = currentCategory?.services || [];

  return (
    <div className="services-page">
      <div className="services-header">
        <div className="header-content">
          <h1 className="services-title">Клиника</h1>
          <p className="services-subtitle">Услуги премиум-класса для вашего здоровья</p>
        </div>
      </div>
      
      <div className="services-layout">
        <div className="categories-sidebar-container">
          <div className="categories-sidebar">
            <div className="sidebar-header">
              <FaClinicMedical className="sidebar-icon" />
              <h3>Категории услуг</h3>
            </div>

            <div className="categories-list">
              {servicesData.categories.map(category => (
                <div key={category.id} className="category-group">
                  <button
                    className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <span>{category.name}</span>
                    <FaArrowRight className="btn-icon" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="sidebar-contacts">
            <h3>Наши контакты</h3>
            <div className="contact-item">
              <FaMapMarkerAlt className="contact-icon" />
              <span>Проспект Мира 26</span>
            </div>
            <div className="contact-item">
              <FaPhone className="contact-icon" />
              <span>+7 (499) 283-32-21</span>
            </div>
          </div>
        </div>
        
        <div className="services-content-container">
          <div className="services-content">
            <div className="content-header">
              <h2 className="current-category">
                {currentCategory?.name}
              </h2>
            </div>
            
            <div className="services-list-container">
              {filteredServices.length > 0 ? (
                <ul className="services-items">
                  {filteredServices.map((service, index) => (
                    <ServiceCard 
                      key={index} 
                      service={service} 
                      isPromo={service.includes('₽')}
                    />
                  ))}
                </ul>
              ) : (
                <div className="no-results">
                  <p>Услуги не найдены</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ServiceCard = ({ service, isPromo }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Форма отправлена:', { service, ...formData });
    setShowModal(false);
    setFormData({ name: '', phone: '', date: '' });
  };

  return (
    <>
      <li 
        className={`service-item ${isPromo ? 'promo' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="service-info">
          <span className="service-name">{service}</span>
          {isPromo && <span className="service-price-badge">Акция</span>}
        </div>
        <button 
          className={`service-btn ${isHovered ? 'hovered' : ''}`}
          onClick={() => setShowModal(true)}
        >
          <FaCalendarAlt className="btn-icon" />
          <span>Записаться</span>
        </button>
      </li>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h3>Запись на услугу</h3>
          <p className="modal-service-name">{service}</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Имя:</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Телефон:</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Дата приема:</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </div>
            <button type="submit" className="submit-btn">
              Подтвердить запись
            </button>
          </form>
        </Modal>
      )}
    </>
  );
};

export default Services;