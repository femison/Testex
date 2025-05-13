import React, { useState } from 'react';
import servicesData from '../data/servicesData.json';
import doctorsData from '../data/doctors.json';
import { FaArrowRight, FaCalendarAlt, FaClinicMedical, FaPhone, FaMapMarkerAlt, FaTimes } from 'react-icons/fa';
import '../style/Services.css';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

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
  const filteredServices = currentCategory?.services
  ? [...new Set(currentCategory.services)]
  : [];

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
                      key={`${service}-${index}`}  
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
  const [showDoctors, setShowDoctors] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [doctorFormData, setDoctorFormData] = useState({
    doctorId: null,
    name: '',
    phone: '',
    date: ''
  });

  const getSpecialtyFromService = (serviceName) => {
  const name = serviceName.toLowerCase();
  if (name.includes("гинеколог")) return "Гинеколог";
  if (name.includes("репродуктолог")) return "Репродуктолог";
  if (name.includes("терапевт")) return "Терапевт";
  if (name.includes("check-up для женщин")) return "Check-Up для женщин";
  if (name.includes("check-up для мужчин")) return "Check-Up для мужчин";
  if (name.includes("комплексное обследование")) return "Комплексное обследование";
  if (name.includes("флороценоз")) return "Флороценоз от 1 300 ₽";
  return null;
};

  const specialty = getSpecialtyFromService(service);
  const availableDoctors = doctorsData.doctors.filter(doc => doc.specialty === specialty);

  const handleDoctorSubmit = (e) => {
    e.preventDefault();
    console.log('Форма записи для врача отправлена:', { doctorFormData });
    setShowModal(false);
    setDoctorFormData({ doctorId: null, name: '', phone: '', date: '' });
  };

  const handleItemClick = () => {
    // Если врачи доступны, переключаем их видимость
    if (availableDoctors.length > 0) {
      setShowDoctors(!showDoctors);
    } else {
      // Если врачей нет, открываем модальное окно
      setShowModal(true);
    }
  };

  return (
    <>
      <li
        className={`service-item ${isPromo ? 'promo' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleItemClick}  // Кликаем по всему элементу
      >
        <div className="service-card-layout">
          <div className="service-info">
            <span className="service-name">{service}</span>
            {isPromo && <span className="service-price-badge">Акция</span>}
          </div>

          <div className="service-actions">
            {availableDoctors.length > 0 && (
              <div className="show-doctors-panel">
                {/* Стрелка вниз, если врачи скрыты, и стрелка вверх, если врачи показаны */}
                {showDoctors ? (
                  <FaArrowUp className="arrow-icon" />
                ) : (
                  <FaArrowDown className="arrow-icon" />
                )}
              </div>
            )}
          </div>
        </div>

        {/* Список врачей под карточкой */}
        {showDoctors && availableDoctors.length > 0 && (
          <div className={`doctors-wrapper ${showDoctors ? 'show' : ''}`}>
              <div className="doctors-list-container">
                <ul className="doctors-list">
                  {availableDoctors.map((doc) => (
                    <li key={doc.id} className="doctor-item">
                      <span>{doc.name}</span>
                      <button
                        className="service-btn"
                        onClick={(e) => {
                          e.stopPropagation();  // Предотвращаем закрытие модалки при клике на кнопку
                          setDoctorFormData({ ...doctorFormData, doctorId: doc.id });
                          setShowModal(true);
                        }}
                      >
                        <FaCalendarAlt className="btn-icon" />
                        Записаться
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
          </div>
        )}
      </li>

      
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h3>Запись на прием</h3>
          <p className="modal-service-name">{service}</p>
          
          {availableDoctors.find(doc => doc.id === doctorFormData.doctorId)?.name && (
            <p className="modal-doctor-name">
              Доктор: {availableDoctors.find(doc => doc.id === doctorFormData.doctorId).name}
            </p>
          )}
          <form onSubmit={handleDoctorSubmit}>
            <div className="form-group">
              <label>Имя:</label>
              <input
                type="text"
                required
                value={doctorFormData.name}
                onChange={(e) => setDoctorFormData({ ...doctorFormData, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Телефон:</label>
              <input
                type="tel"
                required
                value={doctorFormData.phone}
                onChange={(e) => setDoctorFormData({ ...doctorFormData, phone: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Дата приема:</label>
              <input
                type="date"
                required
                value={doctorFormData.date}
                onChange={(e) => setDoctorFormData({ ...doctorFormData, date: e.target.value })}
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
