import React, { useState, useEffect } from 'react';
import '../style/pht.css';
import photo1 from '../img/clinic-1.jpg';
import photo2 from '../img/clinic-2.jpg';
import photo3 from '../img/clinic-3.jpg';
import photo4 from '../img/clinic-4.jpg';
import photo5 from '../img/clinic-5.jpg';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function PhotoGalery() {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const photos = [
    { src: photo1, caption: 'Современное оборудование для диагностики' },
    { src: photo2, caption: 'Передовые технологии' },
    { src: photo3, caption: 'Комфортные палаты для пациентов' },
    { src: photo4, caption: 'Передовые технологии' },
    { src: photo5, caption: 'Команда профессионалов' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % photos.length);
    }, 5000); // Меняем фото каждые 5 секунд

    return () => clearInterval(interval); // Очистка интервала при размонтировании
  }, [photos.length]);

  const goToPrevious = () => {
    setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const goToNext = () => {
    setCurrentPhoto((prev) => (prev + 1) % photos.length);
  };

  return (
    <div className="photo-gallery-container">
      {/* Расширенное описание клиники */}
      <div className="gallery-description">
        <h1>Клиника Фомина</h1>
        <p>
          Клиника Фомина — это сеть многопрофильных клиник, предлагающая доказательную медицину для всей семьи. Мы предоставляем широкий спектр услуг, включая диагностику, лечение и реабилитацию, с использованием передовых технологий и квалифицированных специалистов. Наша цель — обеспечить комфорт и здоровье каждого пациента.
        </p>
       
      </div>
      

      {/* Блок с фотографиями */}
      <div className="gallery-slider">
        {photos.map((photo, index) => (
          <div
            key={index}
            className={index === currentPhoto ? 'active slide' : 'slide'}
          >
            <img
              src={photo.src}
              alt={`clinic-${index + 1}`}
              className="slider-image"
            />
            <div className="caption">{photo.caption}</div>
          </div>
        ))}
        {/* Кнопки управления */}
        <button className="slider-prev" onClick={goToPrevious}>
          <FaChevronLeft />
        </button>
        <button className="slider-next" onClick={goToNext}>
          <FaChevronRight />
        </button>
        {/* Индикаторы */}
        <div className="slider-indicators">
          {photos.map((_, index) => (
            <span
              key={index}
              className={index === currentPhoto ? 'indicator active' : 'indicator'}
              onClick={() => setCurrentPhoto(index)}
            ></span>
          ))}
        </div>
      </div>
      

    {/* Блок с контактной информацией */}
      
          
    
    </div>
    
    
    
  );
}

export default PhotoGalery;