
import './App.css';
import {BrowserRouter as Router, Route, Routes} from  'react-router-dom';
import Login from './Componentes/Login';
import Registro from './Componentes/Registro';
import Principal from './Componentes/Principal';
import VerificationPage from './Componentes/VerificationPage';
function App() {
  return (
   <Router>
    <div className='App'>
    
      <div className='contenedor-principal'>
      <Routes>
        {/* Ruta para el  Login*/}
        <Route  path='/login' element={<Login />}/>
        {/* Ruta para el  Registro*/}
        <Route  path='/registro' element={<Registro/>}/>
        <Route  path='/principal' element={<Principal/>}/>
        <Route path='/verification' element={<VerificationPage/>}/>
      </Routes>
      </div>
    </div>
   </Router>
  );
}

export default App;
