
import './App.css';
import {BrowserRouter as Router, Route, Routes} from  'react-router-dom';
import Login from './Componentes/Login';
import Registro from './Componentes/Registro';
function App() {
  return (
   <Router>
    <div className='App'>
      <h1>Tienda Tech Nicolas</h1>
      <div className='contenedor-principal'>
      <Routes>
        {/* Ruta para el  Login*/}
        <Route  path='/login' element={<Login />}/>
        {/* Ruta para el  Registro*/}
        <Route  path='/registro' element={<Registro/>}/>
      </Routes>
      </div>
    </div>
   </Router>
  );
}

export default App;
