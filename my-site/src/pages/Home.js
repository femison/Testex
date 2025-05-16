import React, { useState, useRef, useEffect } from "react";
import "../style/Home.css";
import doctorPhoto from "../img/doctor-photo.jpg";
import { FaMale, FaFemale, FaChild, FaTimes } from "react-icons/fa";
import servicesData from "../data/servicesData.json";
import doctorsData from "../data/doctors.json";
import {
  FaStethoscope,
  FaUserMd,
  FaHeartbeat,
  FaVial,
  FaVials,
  FaSyringe,
  FaNotesMedical,
  FaProcedures,
  FaHospitalUser,
  FaFlask,
  FaMicroscope,
  FaThermometerHalf,
  FaCapsules,
} from "react-icons/fa";

// Компонент модального окна
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

const Home = () => {
  const doctorPhotos = Array.from({ length: 8 }, (_, i) => require(`../img/doctor-${i + 1}.jpg`));
  const [selectedCard, setSelectedCard] = useState("men");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    service: "",
    name: "",
    phone: "",
    date: "",
  });

  const getFilteredServices = (card) => {
    const allCategories = servicesData?.categories || [];
    const filters = {
      men: [1, 2, 3, 4, 6, 7, 8],
      women: [1, 2, 3, 5, 6, 7, 8],
      children: [1, 2, 3, 4, 6, 7, 8],
    };
    const serviceFilters = {
      men: (service) =>
        service.includes("для мужчин") ||
        [
          "Консультация кардиолога",
          "Консультация ортопеда",
          "Кардиологический скрининг",
          "УЗИ брюшной полости",
          "ЭКГ",
          "Физическая реабилитация",
          "Скрининг рака",
          "Проверка зрения",
        ].includes(service),
      women: (service) =>
        service.includes("для женщин") ||
        [
          "Консультация гинеколога",
          "Консультация репродуктолога",
          "Консультация эндокринолога",
          "Гинекологические операции",
          "Лапароскопия",
          "Флороценоз",
          "ВПЧ-ПАП тест",
          "Жидкостная цитология",
          "МРТ головного мозга",
          "Эндоскопия",
          "Ортопедическая реабилитация",
          "Кинезиотерапия",
          "Вакцинация",
          "Диетологическая консультация",
        ].includes(service),
      children: (service) =>
        service.includes("детского") ||
        [
          "Консультация невролога",
          "Программа детского здоровья",
          "Комплексное обследование",
          "Капельницы",
          "Физиотерапия",
          "Рентген легких",
          "ЭЭГ",
          "Лечебная гимнастика",
          "Проверка слуха",
        ].includes(service),
    };

    return allCategories
      .filter((category) => filters[card].includes(category.id))
      .map((category) => ({
        id: category.id,
        name: category.name,
        services: category.services.filter(serviceFilters[card]),
      }))
      .filter((category) => category.services.length > 0);
  };

  const scrollRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const slider = scrollRef.current;
    if (!slider) return;

    const handleMouseDown = (e) => {
      isDown.current = true;
      slider.classList.add("active");
      startX.current = e.pageX - slider.offsetLeft;
      scrollLeft.current = slider.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown.current = false;
      slider.classList.remove("active");
    };

    const handleMouseUp = () => {
      isDown.current = false;
      slider.classList.remove("active");
    };

    const handleMouseMove = (e) => {
      if (!isDown.current) return;
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX.current) * 2;
      slider.scrollLeft = scrollLeft.current - walk;
    };

    slider.addEventListener("mousedown", handleMouseDown);
    slider.addEventListener("mouseleave", handleMouseLeave);
    slider.addEventListener("mouseup", handleMouseUp);
    slider.addEventListener("mousemove", handleMouseMove);

    return () => {
      slider.removeEventListener("mousedown", handleMouseDown);
      slider.removeEventListener("mouseleave", handleMouseLeave);
      slider.removeEventListener("mouseup", handleMouseUp);
      slider.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const getServiceIcon = (serviceName) => {
    const iconMap = {
      "Консультация гинеколога": <FaUserMd size={24} color="#1e88e5" />,
      "Консультация репродуктолога": <FaHeartbeat size={24} color="#1e88e5" />,
      "Консультация терапевта": <FaStethoscope size={24} color="#1e88e5" />,
      "Check-Up для женщин": <FaNotesMedical size={24} color="#1e88e5" />,
      "Check-Up для мужчин": <FaHospitalUser size={24} color="#1e88e5" />,
      "Комплексное обследование": <FaThermometerHalf size={24} color="#1e88e5" />,
      "Флороценоз": <FaFlask size={24} color="#1e88e5" />,
      "ВПЧ-ПАП тест": <FaMicroscope size={24} color="#1e88e5" />,
      "Жидкостная цитология": <FaVial size={24} color="#1e88e5" />,
      "Забор биоматериала": <FaVials size={24} color="#1e88e5" />,
      "Инъекции": <FaSyringe size={24} color="#1e88e5" />,
      "Перевязки": <FaCapsules size={24} color="#1e88e5" />,
      "Гинекологические операции": <FaProcedures size={24} color="#1e88e5" />,
      "Малые хирургические вмешательства": <FaUserMd size={24} color="#1e88e5" />,
      "Лапароскопия": <FaProcedures size={24} color="#1e88e5" />,
      "Удаление аппендикса": <FaProcedures size={24} color="#1e88e5" />,
      "Хирургия позвоночника": <FaUserMd size={24} color="#1e88e5" />,
      "Пластическая хирургия": <FaUserMd size={24} color="#1e88e5" />,
      "УЗИ брюшной полости": <FaFlask size={24} color="#1e88e5" />,
      "МРТ головного мозга": <FaMicroscope size={24} color="#1e88e5" />,
      "Рентген легких": <FaVial size={24} color="#1e88e5" />,
      "ЭКГ": <FaHeartbeat size={24} color="#1e88e5" />,
      "ЭЭГ": <FaMicroscope size={24} color="#1e88e5" />,
      "Эндоскопия": <FaFlask size={24} color="#1e88e5" />,
      "Физическая реабилитация": <FaNotesMedical size={24} color="#1e88e5" />,
      "Лечебная гимнастика": <FaNotesMedical size={24} color="#1e88e5" />,
      "Психологическая поддержка": <FaHeartbeat size={24} color="#1e88e5" />,
      "Ортопедическая реабилитация": <FaUserMd size={24} color="#1e88e5" />,
      "Кинезиотерапия": <FaNotesMedical size={24} color="#1e88e5" />,
      "Вакцинация": <FaSyringe size={24} color="#1e88e5" />,
      "Скрининг рака": <FaMicroscope size={24} color="#1e88e5" />,
      "Диетологическая консультация": <FaNotesMedical size={24} color="#1e88e5" />,
    };
    return iconMap[serviceName] || <FaNotesMedical size={24} color="#1e88e5" />;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.date) {
      alert("Пожалуйста, заполните все поля!");
      return;
    }
    console.log("Форма записи отправлена:", formData);
    setShowModal(false);
    setFormData({ service: "", name: "", phone: "", date: "" });
  };

  return (
    <div>
      {/* Intro Section */}
      <div className="intro">
        <div className="container-intro">
          <div className="intro__inner">
            <div className="intro__content">
              <h1 className="intro-text">
                Сеть многопрофильных клиник <br /> доказательной медицины
              </h1>
              <p className="intro__subtitle">
                Комплексный подход к здоровью для всей семьи
              </p>
            </div>
            <div className="semicircle">
              <img src={doctorPhoto} alt="Doctor" className="circle-photo" />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="section">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">Услуги Клиники Фомина</h2>
            <div className="section__text">Подберите подходящие услуги</div>
          </div>
          <div className="usl-div">
            <div className="cards">
              {["men", "women", "children"].map((card) => (
                <React.Fragment key={card}>
                  <div
                    className={`card ${selectedCard === card ? "active" : ""}`}
                    onClick={() => setSelectedCard(card)}
                  >
                    {card === "men" && <FaMale className="card__image" size={48} color="#1e88e5" />}
                    {card === "women" && <FaFemale className="card__image" size={48} color="#1e88e5" />}
                    {card === "children" && <FaChild className="card__image" size={48} color="#1e88e5" />}
                    <div className="card__title">
                      {card === "men" && "Для мужчин"}
                      {card === "women" && "Для женщин"}
                      {card === "children" && "Для детей"}
                    </div>
                  </div>
                  {selectedCard === card && (
                    <div className={`services-menu ${selectedCard === card ? "active" : ""}`}>
                      {getFilteredServices(card).map((category) => (
                        <div key={category.id} className="services-menu__category">
                          <div className="services-menu__category-title">{category.name}</div>
                          <div className="services-menu__grid">
                            {category.services.map((service, index) => (
                              <div
                                key={index}
                                className="services-menu__item"
                                onClick={() => {
                                  setFormData({ ...formData, service });
                                  setShowModal(true);
                                }}
                              >
                                <div className="svg-list">{getServiceIcon(service)}</div>
                                <span>{service}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Doctors Section */}
      <div className="scrollable-list__wrapper">
        <h2 className="scrollable-title">Наши врачи</h2>
        <div className="scrollable-list" ref={scrollRef}>
          {doctorsData.doctors.slice(0, 8).map((doctor, index) => (
            <div className="scrollable-item" key={doctor.id}>
              <div className="icon-blur-wrapper">
                <img
                  src={doctorPhotos[index]?.default || doctorPhotos[index] || doctorPhoto}
                  alt={doctor.name}
                  className="doctor-photo"
                />
                <div className="doctor-info">
                  <div className="doctor-name">{doctor.name}</div>
                  <div className="doctor-specialty">{doctor.specialty}</div>
                </div>
              </div>
              
            </div>
          ))}
        </div>
      </div>

      {/* Модальное окно для записи */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h3>Запись на прием</h3>
          <p className="modal-service-name">Услуга: {formData.service}</p>
          <p className="modal-description">
            Пожалуйста, заполните форму ниже, чтобы записаться на прием. После отправки формы наш администратор свяжется с вами для подтверждения записи.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Имя:</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Введите имя"
              />
            </div>
            <div className="form-group">
              <label>Телефон:</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+7 (999) 123-45-67"
              />
            </div>
            <div className="form-group">
              <label>Дата приема:</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <button type="submit" className="submit-btn">
              Подтвердить запись
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Home;