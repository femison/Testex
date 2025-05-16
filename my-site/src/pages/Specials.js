import React, { useState } from 'react';
import specialsData from '../data/specialsData.json';
import '../style/Specials.css';
import checkU from '../img/check-U.jpg';
import dantist from '../img/dantist.jpg';
import obs from '../img/obs.jpg';
import massage from '../img/massage.jpg';
import childCheckup from '../img/child-checkup.jpg';
import { FaTimes } from 'react-icons/fa';

const Specials = () => {
  const imageMap = {
    1: checkU,
    2: dantist,
    3: obs,
    4: massage,
    5: childCheckup,
  };

  const [showModal, setShowModal] = useState(false);
  const [selectedSpecial, setSelectedSpecial] = useState(null);
  const [filterOption, setFilterOption] = useState('active'); // 'all', 'active', 'expired'

  // Используем текущую дату
  const currentDate = new Date(); // Сегодня: 16 мая 2025, 04:06 PM EEST

  const filteredSpecials = specialsData.specials.filter(special => {
    // Парсим дату из формата "До DD.MM.YYYY"
    const dateStr = special.date.replace('До ', ''); // Получаем "DD.MM.YYYY"
    const [day, month, year] = dateStr.split('.'); // Разбиваем на день, месяц, год
    const specialEndDate = new Date(year, month - 1, day);

    // Проверяем, что дата валидна
    if (isNaN(specialEndDate)) {
      console.error(`Invalid date for special: ${special.title}, date: ${special.date}`);
      return false;
    }

    const isActive = specialEndDate >= currentDate;

    switch (filterOption) {
      case 'all':
        return true;
      case 'active':
        return isActive;
      case 'expired':
        return !isActive;
      default:
        return true;
    }
  });

  const handleRecord = (special) => {
    setSelectedSpecial(special);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSpecial(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Запись на акцию:', selectedSpecial.title, e.target.elements);
    handleCloseModal();
  };

  return (
    <div className="specials-page">
      <header className="specials-header">
        <h1 className="specials-title">Акции и специальные предложения</h1>
        <p className="specials-subtitle">Воспользуйтесь нашими выгодными предложениями для вашего здоровья!</p>
      </header>

      <div className="specials-controls">
        <div className="filter-box">
          <label>
            <select
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
            >
              <option value="all">Все акции</option>
              <option value="active">Только активные</option>
              <option value="expired">Истёкшие акции</option>
            </select>
          </label>
        </div>
      </div>

      <div className="specials-container">
        {filteredSpecials.length > 0 ? (
          filteredSpecials.map(special => {
            // Проверяем статус акции
            const dateStr = special.date.replace('До ', '');
            const [day, month, year] = dateStr.split('.');
            const specialEndDate = new Date(year, month - 1, day);
            const isActive = specialEndDate >= currentDate;

            return (
              <div
                key={special.id}
                className={`special-card ${!isActive ? 'expired' : ''}`}
              >
                <div className="special-image-container">
                  <img
                    src={imageMap[special.id] || special.image || ''}
                    alt={special.title}
                    className="special-image"
                  />
                  <span className="special-badge">Акция</span>
                </div>
                <div className="special-content">
                  <h2 className="special-name">{special.title}</h2>
                  <p className="special-description">{special.description}</p>
                  <div className="special-prices">
                    <span className="special-new-price">{special.price}</span>
                    <span className="special-old-price">{special.oldPrice}</span>
                  </div>
                  <div className="special-footer">
                    <span className="special-date">⏳ {special.date}</span>
                    {isActive ? (
                      <button
                        className="special-button"
                        onClick={() => handleRecord(special)}
                      >
                        Записаться
                      </button>
                    ) : (
                      <span className="expired-text">Акция истекла</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="no-specials">Акций по вашему запросу не найдено.</p>
        )}
      </div>

      <div className="specials-info">
        <h2 className="specials-info-title">Почему выбирают наши акции?</h2>
        <div className="specials-benefits">
          <div className="benefit-item">
            <h3>Выгода</h3>
            <p>Скидки до 30% на популярные услуги.</p>
          </div>
          <div className="benefit-item">
            <h3>Качество</h3>
            <p>Услуги от лучших специалистов с использованием современного оборудования.</p>
          </div>
          <div className="benefit-item">
            <h3>Удобство</h3>
            <p>Запишитесь онлайн в два клика!</p>
          </div>
        </div>
        <div className="specials-contacts">
          <h3>Свяжитесь с нами</h3>
          <p>Телефон: +7 (495) 123-45-67</p>
          <p>Email: info@clinic.ru</p>
          <p>Адрес: г. Москва, ул. Здоровья, д. 10</p>
        </div>
      </div>

      {showModal && selectedSpecial && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={handleCloseModal}>
              <FaTimes />
            </button>
            <h2>Запись на акцию</h2>
            <p className="modal-special-name">Акция: {selectedSpecial.title}</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Имя</label>
                <input type="text" required placeholder="Введите имя" />
              </div>
              <div className="form-group">
                <label>Телефон</label>
                <input type="tel" required placeholder="+7 (999) 123-45-67" />
              </div>
              <div className="form-group">
                <label>Дата</label>
                <input type="date" required min={currentDate.toISOString().split('T')[0]} />
              </div>
              <button type="submit" className="submit-btn">
                Подтвердить запись
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Specials;