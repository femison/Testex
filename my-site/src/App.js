import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CheckUp from './pages/CheckUp';
import Doctors from './pages/Doctors';
import Specials from './pages/Specials';
import './App.css';
import Services from './pages/Services';
import './style/header.css';
import { FaClinicMedical } from 'react-icons/fa';

function App() {
  return (
    <Router>
      <header className="App-header">
        <div className="nav-container">
          <div className="clinic-logo">
            <FaClinicMedical />
            <p class = "header-text">КЛИНИКА ФОМИНА</p>
          </div>
          <nav className="main-nav">
            <Link to="/">Главная</Link>
            <Link to="/Services">Услуги</Link>
            <Link to="/CheckUp">Чекапы</Link>
            {/* <Link to="/Doctors">Врачи</Link> */}
            <Link to="/Specials">Акции</Link>
          </nav>
          
          <Link to="/Services"><button className="record-button" Link ="/Services">Записаться</button></Link>
          
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/CheckUp" element={<CheckUp />} />
        <Route path="/Doctors" element={<Doctors />} />
        <Route path="/Specials" element={<Specials />} />
      </Routes>

      <footer className="main-footer">
        <p>© {new Date().getFullYear()} Клиника Фомина. Все права защищены.</p>
      </footer>
    </Router>
  );
}

export default App;
