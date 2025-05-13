import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CheckUp from './pages/CheckUp';
import Doctors from './pages/Doctors.js';
import Specials from './pages/Specials';
import './App.css';
import Services from './pages/Services'; 
function App() {
  return (
    <Router>
      <header className="App-header">
        <nav>
          <Link to="/">Главная</Link> |{" "}
          <Link to="/Services">Услуги</Link> |{" "}
          <Link to="/CheckUp">Чекапы</Link> |{" "}
          <Link to="/Doctors">Врачи</Link> |{" "}
          <Link to="/Specials">Акции</Link> |{" "}
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/CheckUp" element={<CheckUp />} />
        <Route path="/Doctors" element={<Doctors />} />
        <Route path="/Specials" element={<Specials />} />
      </Routes>

      <footer className="App-footer">
        <p>© 2025 Мой Сайт | <Link to="/CheckUp">Чекапы</Link> | <Link to="/Doctors">Врачи</Link></p>
      </footer>
    </Router>
  );
}

export default App;