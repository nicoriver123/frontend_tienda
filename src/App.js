import './App.css';
import './stylesheets/Home.css';
import './stylesheets/logo.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Componentes/Login';
import Registro from './Componentes/Registro';
import VerificationPage from './Componentes/VerificationPage';
import Home from './views/Home';
import Layout from './views/Layout'; // Importar Layout
import ProductDetail from './views/ProductDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Rutas dentro del Layout */}
          <Route path="/" element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/producto/:id" element={<ProductDetail />} />
          </Route>

          {/* Rutas fuera del Layout */}
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/verification" element={<VerificationPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;