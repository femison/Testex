import React from 'react';
import specialsData from '../data/specialsData.json';
import '../style/Specials.css';

const Specials = () => {
  return (
    <div className="specials-page">
      <h1 className="specials-title">Акции и специальные предложения</h1>
      
      <div className="specials-container">
        {specialsData.specials.map((special) => (
          <div key={special.id} className="special-card">
            <div className="special-image-container">
              <img 
                src={special.image} 
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
                <button className="special-button">Записаться</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Specials;