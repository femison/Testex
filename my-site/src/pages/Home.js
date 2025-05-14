import React from "react";
import '../style/Home.css';

const Home = () => {
  return (
    <div>
     
     

      {/* Intro Section */}
      <div className="intro">
        <div className="container-intro">
          <div className="intro__inner">
            <div class = "bt-start">
              <button class = "header-bt">мужчинам</button>
              <button class = "header-bt">женщинам</button>
              <button class = "header-bt">детям</button>
            </div>
            <h1 class = "intro-text">
                Сеть многопрофильных клиник доказательной медицины
            </h1>
          </div>

            <div>
               <p>Добавить сюда фото</p>           
            </div>
        </div>
        
      </div>

      {/* Features Section */}
      <div className="section">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">Why VoluntEase?</h2>
            <div className="section__text">
              Discover the easiest way to connect with causes you care about.
            </div>
          </div>
          <div className="cards">
            <div className="card">
              <img className="card__image" src="images/connect.png" alt="Connect" />
              <div className="card__title">Connect</div>
              <div className="card__text">Link up with organizations in need of your skills.</div>
            </div>
            <div className="card">
              <img className="card__image" src="images/support.png" alt="Support" />
              <div className="card__title">Support</div>
              <div className="card__text">Offer your time and energy to meaningful causes.</div>
            </div>
            <div className="card">
              <img className="card__image" src="images/grow.png" alt="Grow" />
              <div className="card__title">Grow</div>
              <div className="card__text">Develop your skills and experience through service.</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta">
        <div className="container">
          <h2 className="cta__title">Join our community of change-makers</h2>
          <a className="btn btn--big" href="#">Sign Up Now</a>
        </div>
      </div>

     
      
    </div>
  );
};

export default Home;
