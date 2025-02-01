
import React, { useState } from 'react'; // Importa React y el hook useState para manejar el estado del componente
import Container from 'react-bootstrap/Container'; // Importa el contenedor de Bootstrap para la estructura del Navbar
import Nav from 'react-bootstrap/Nav'; // Importa la barra de navegación de Bootstrap
import Navbar from 'react-bootstrap/Navbar'; // Importa el componente Navbar de Bootstrap
import NavDropdown from 'react-bootstrap/NavDropdown'; // Importa el menú desplegable de Bootstrap
import Form from 'react-bootstrap/Form'; // Importa el formulario de búsqueda
import Button from 'react-bootstrap/Button'; // Importa el botón de Bootstrap
import Offcanvas from 'react-bootstrap/Offcanvas'; // Importa el componente Offcanvas para mostrar el carrito de compras
import { useAuth } from '../Componentes/AuthContext'; // Importa el contexto de autenticación para manejar el usuario
import { FaShoppingBag } from 'react-icons/fa'; // Importa el icono de la bolsa de compras

function MyNavbar() {
  // Extrae la información del usuario y la función logout desde el contexto de autenticación
  const { user, logout } = useAuth();

  // Estado para manejar el término de búsqueda
  const [searchTerm, setSearchTerm] = useState('');

  // Estado para controlar la visibilidad del carrito de compras
  const [showCartMenu, setShowCartMenu] = useState(false);

  // Función que maneja el envío del formulario de búsqueda
  const handleSearch = (e) => {
    e.preventDefault(); // Evita la recarga de la página al enviar el formulario
    if (searchTerm.trim()) {
      // Aquí puedes agregar la lógica para redirigir a la página de resultados de búsqueda
    }
  };

  // Función que alterna la visibilidad del menú del carrito de compras
  const handleCartClick = () => {
    setShowCartMenu(!showCartMenu); // Cambia el estado para mostrar u ocultar el carrito
  };

  return (
    // Barra de navegación principal
    <Navbar expand="lg" className="color-navbar fixed-top">
      <Container>
        {/* Sección izquierda del Navbar: Logo y marca */}
        <Nav className="d-flex align-items-center">
          {/* Logo de la tienda */}
          <img
            className="imagen_logo"
            src={require('../imagenes/logo-tech.jpeg')} // Carga la imagen del logo desde la carpeta local
            alt="Logo de Tienda Tech"
          />
          {/* Nombre de la tienda con enlace a la página principal */}
          <Navbar.Brand href="/home" className="ms-3">
            Tienda Tech Nicolas
          </Navbar.Brand>
          {/* Formulario de búsqueda */}
          <Form className="d-flex" onSubmit={handleSearch}>
            <Form.Control
              type="search" // Campo de entrada para buscar productos
              placeholder="Buscar productos"
              className="me-2"
              aria-label="Search"
              value={searchTerm} // Valor del input controlado por el estado
              onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el estado al escribir en el campo
            />
            {/* Botón para buscar */}
            <Button className="bg-green text-white" type="submit">
              Buscar
            </Button>
          </Form>
        </Nav>

        {/* Botón para colapsar el menú en dispositivos móviles */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Sección derecha del Navbar con opciones de usuario y carrito */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* Icono del carrito de compras */}
            <Nav.Link href="#" className="cart-icon" onClick={handleCartClick}>
              <FaShoppingBag size={24} />
            </Nav.Link>

            {/* Si el usuario está autenticado, muestra su nombre y un menú desplegable */}
            {user ? (
              <NavDropdown title={user.name} id="basic-nav-dropdown">
                {/* Opción para ir al perfil */}
                <NavDropdown.Item href="/perfil">Perfil</NavDropdown.Item>
                {/* Opción de ayuda */}
                <NavDropdown.Item href="/ayuda">Ayuda</NavDropdown.Item>
                {/* Separador */}
                <NavDropdown.Divider />
                {/* Opción para cerrar sesión */}
                <NavDropdown.Item onClick={logout}>
                  Cerrar Sesión
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              // Si no está autenticado, muestra la opción para iniciar sesión
              <Nav.Link href="/login">Iniciar Sesión</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>

      {/* Menú lateral del carrito de compras */}
      <Offcanvas show={showCartMenu} onHide={() => setShowCartMenu(false)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Carrito de Compras</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* Aquí irá el contenido del carrito de compras */}
          <p>Aquí se mostrarán los productos en el carrito de compras.</p>
        </Offcanvas.Body>
      </Offcanvas>
    </Navbar>
  );
}

export default MyNavbar; // Exporta el componente para que pueda ser utilizado en otras partes de la aplicación

