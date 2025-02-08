import React, { useState, useEffect, useRef } from "react"; // Importa React y el hook useState para manejar el estado del componente
import axios from "axios";
import Container from "react-bootstrap/Container"; // Importa el contenedor de Bootstrap para la estructura del Navbar
import Nav from "react-bootstrap/Nav"; // Importa la barra de navegación de Bootstrap
import Navbar from "react-bootstrap/Navbar"; // Importa el componente Navbar de Bootstrap
import NavDropdown from "react-bootstrap/NavDropdown"; // Importa el menú desplegable de Bootstrap
import Form from "react-bootstrap/Form"; // Importa el formulario de búsqueda
import Button from "react-bootstrap/Button"; // Importa el botón de Bootstrap
import Offcanvas from "react-bootstrap/Offcanvas"; // Importa el componente Offcanvas para mostrar el carrito de compras
import { useAuth } from "../Componentes/AuthContext"; // Importa el contexto de autenticación para manejar el usuario
import { FaShoppingBag } from "react-icons/fa"; // Importa el icono de la bolsa de compras
import { useCart } from "../Componentes/CartContext"; // Importa el contexto del carrito
import Badge from "react-bootstrap/Badge"; // Importa el componente Badge
import "../stylesheets/MyNavbar.css"; // Importa los estilos CSS personalizados

function MyNavbar() {
  // Obtiene el estado y las funciones del contexto del carrito
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    showCartMenu,
    setShowCartMenu,
    clearCart,
  } = useCart();

  // Obtiene el estado y las funciones del contexto de autenticación
  const { user, logout } = useAuth();

  // Estado para manejar el término de búsqueda
  const [searchTerm, setSearchTerm] = useState("");

  // Estado para manejar mensajes de error
  const [errorMessage, setErrorMessage] = useState("");

  // Estados para manejar la funcionalidad del buscador
  const [showSuggestions, setShowSuggestions] = useState(false); // Controla la visibilidad del panel de sugerencias
  const [products, setProducts] = useState([]); // Almacena todos los productos de la base de datos
  const [filteredProducts, setFilteredProducts] = useState([]); // Almacena los productos filtrados según la búsqueda
  const searchRef = useRef(null); // Referencia al contenedor del buscador para detectar clics fuera de él

  // useEffect para cargar todos los productos cuando el componente se monta
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/productos") // Llamada a la API para obtener productos
      .then((response) => {
        setProducts(response.data); // Almacena los productos en el estado
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error); // Manejo de errores
      });
  }, []); // El array vacío significa que solo se ejecuta al montar el componente

  // useEffect para manejar el cierre del panel de sugerencias al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      // Verifica si el clic fue fuera del contenedor del buscador
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false); // Cierra el panel de sugerencias
      }
    }

    // Agrega el event listener cuando el componente se monta
    document.addEventListener("mousedown", handleClickOutside);

    // Limpia el event listener cuando el componente se desmonta
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Solo se ejecuta al montar y desmontar el componente

  // Función que maneja la búsqueda en tiempo real mientras el usuario escribe
  const handleSearch = (e) => {
    const term = e.target.value; // Obtiene el valor actual del campo de búsqueda
    setSearchTerm(term); // Actualiza el estado del término de búsqueda

    if (term.trim() === "") {
      // Si el campo está vacío (o solo espacios)
      setFilteredProducts([]); // Limpia los productos filtrados
      setShowSuggestions(false); // Oculta el panel de sugerencias
    } else {
      // Si hay texto en el campo de búsqueda
      const filtered = products.filter(
        (product) => product.nombre.toLowerCase().includes(term.toLowerCase()) // Filtra productos que coincidan con el término
      );
      setFilteredProducts(filtered); // Actualiza la lista de productos filtrados
      setShowSuggestions(true); // Muestra el panel de sugerencias
    }
  };

  // Función que maneja el envío del formulario (cuando se presiona Enter)
  const handleSubmit = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario (recarga de página)

    if (searchTerm.trim() === "") {
      return; // Si el campo está vacío, no hace nada
    }

    // Si hay productos filtrados, redirige al primer producto de la lista
    if (filteredProducts.length > 0) {
      window.location.href = `/producto/${filteredProducts[0].id}`;
    }
    // Si no hay productos, mantiene visible el mensaje "No se encontraron productos"
    setShowSuggestions(true);
  };
  // Función que alterna la visibilidad del menú del carrito de compras
  const handleCartClick = () => {
    setShowCartMenu(!showCartMenu); // Cambia el estado para mostrar u ocultar el carrito
  };

  // Función para aumentar la cantidad de un producto en el carrito con validación de stock
  const handleIncreaseQuantity = (productId, stock) => {
    const productInCart = cart.find((item) => item.id === productId); // Busca el producto en el carrito
    if (productInCart.quantity < stock) {
      increaseQuantity(productId); // Aumenta la cantidad si no excede el stock
      setErrorMessage(""); // Limpia el mensaje de error
    } else {
      setErrorMessage("No hay suficiente stock disponible."); // Muestra un mensaje de error
    }
  };

  // Función para disminuir la cantidad de un producto en el carrito
  const handleDecreaseQuantity = (productId) => {
    decreaseQuantity(productId); // Disminuye la cantidad
    setErrorMessage(""); // Limpia el mensaje de error
  };

  // Calcular el número de productos distintos en el carrito
  const totalItemsInCart = cart.length;

  // Calcular el total de los productos en el carrito
  const totalPrice = cart.reduce(
    (total, product) => total + product.precio * product.quantity,
    0
  );

  // Función para cerrar sesión y vaciar el carrito
  const handleLogout = () => {
    logout(); // Cierra la sesión
    clearCart(); // Vacía el carrito
  };

  // Función para manejar el proceso de pago
  const handleCheckout = () => {
    if (user) {
      // Redirige a la página de pago si el usuario está autenticado
      window.location.href = "/checkout";
    } else {
      // Redirige a la página de login si no está autenticado
      window.location.href = "/login";
    }
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
            src={require("../imagenes/logo-tech.jpeg")} // Carga la imagen del logo desde la carpeta local
            alt="Logo de Tienda Tech"
          />
          {/* Nombre de la tienda con enlace a la página principal */}
          <Navbar.Brand href="/home" className="ms-3">
            Tienda Tech Nicolas
          </Navbar.Brand>
          {/* Contenedor principal del buscador que utiliza una referencia (ref) para detectar clics fuera del componente */}
          <div className="search-container" ref={searchRef}>
            {/* Formulario de búsqueda que previene la recarga de página al enviar */}
            <Form className="d-flex" onSubmit={handleSubmit}>
              {/* Campo de entrada de búsqueda */}
              <Form.Control
                type="search"
                placeholder="Buscar productos" // Texto que se muestra cuando el campo está vacío
                className="me-2" // Margen a la derecha usando clases de Bootstrap
                value={searchTerm} // Valor controlado por el estado searchTerm
                onChange={handleSearch} // Función que se ejecuta cada vez que el usuario escribe
                onFocus={() => {
                  // Cuando el campo recibe el foco (click o tab)
                  if (searchTerm.trim() !== "") {
                    // Si hay texto en el campo
                    setShowSuggestions(true); // Muestra el panel de sugerencias
                  }
                }}
              />

              {/* Panel de sugerencias que solo se muestra cuando showSuggestions es true */}
              {showSuggestions && (
                <div className="search-suggestions">
                  {/* Operador ternario para mostrar productos o mensaje de no resultados */}
                  {filteredProducts.length > 0 ? (
                    // Si hay productos filtrados, los mapea y muestra cada uno
                    filteredProducts.map((product) => (
                      // Enlace clickeable para cada producto
                      <a
                        key={product.id} // Key única requerida por React para listas
                        href={`/producto/${product.id}`} // URL dinámica para cada producto
                        className="suggestion-item"
                        onClick={() => {
                          // Al hacer click en un producto:
                          setShowSuggestions(false); // Oculta el panel de sugerencias
                          setSearchTerm(""); // Limpia el campo de búsqueda
                        }}
                      >
                        {/* Imagen del producto */}
                        <img
                          src={`http://localhost:8080${product.imagenUrl}`}
                          alt={product.nombre}
                          className="suggestion-image"
                        />
                        {/* Contenedor para los detalles del producto */}
                        <div className="suggestion-details">
                          {/* Nombre del producto */}
                          <div className="suggestion-name">
                            {product.nombre}
                          </div>
                          {/* Precio formateado en pesos colombianos */}
                          <div className="suggestion-price">
                            {new Intl.NumberFormat("es-CO", {
                              style: "currency",
                              currency: "COP",
                              minimumFractionDigits: 0, // Sin decimales
                            }).format(product.precio)}
                          </div>
                        </div>
                      </a>
                    ))
                  ) : (
                    // Si no hay productos filtrados, muestra mensaje de no resultados
                    <div className="no-results">
                      No se encontraron productos.
                    </div>
                  )}
                </div>
              )}
            </Form>
          </div>
        </Nav>

        {/* Botón para colapsar el menú en dispositivos móviles */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Sección derecha del Navbar con opciones de usuario y carrito */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* Icono del carrito de compras */}
            <Nav.Link href="#" className="cart-icon" onClick={handleCartClick}>
              <FaShoppingBag size={24} />
              {/* Mostrar el contador si hay productos en el carrito */}
              {totalItemsInCart > 0 && (
                <Badge pill bg="danger" className="cart-badge">
                  {totalItemsInCart}
                </Badge>
              )}
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
                <NavDropdown.Item onClick={handleLogout}>
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
      <Offcanvas
        show={showCartMenu}
        onHide={() => setShowCartMenu(false)}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Carrito de Compras</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* Muestra un mensaje de error si existe */}
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}

          {/* Contenedor de los productos en el carrito */}
          <div className="cart-items-container">
            {cart.map((product) => (
              <div key={product.id} className="cart-item">
                {/* Imagen del producto */}
                <img
                  src={`http://localhost:8080${product.imagenUrl}`}
                  alt={product.nombre}
                  className="cart-item-img"
                />
                {/* Detalles del producto */}
                <div className="cart-item-details">
                  <p>{product.nombre}</p>
                  <p>
                    Precio Unitario:{" "}
                    {new Intl.NumberFormat("es-CO", {
                      style: "currency",
                      currency: "COP",
                      minimumFractionDigits: 0,
                    }).format(product.precio)}
                  </p>
                  {/* Contenedor de la cantidad */}
                  <div className="quantity-container">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleDecreaseQuantity(product.id)}
                    >
                      -
                    </Button>
                    <span className="quantity">{product.quantity}</span>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() =>
                        handleIncreaseQuantity(product.id, product.stock)
                      }
                    >
                      +
                    </Button>
                  </div>
                  <p>
                    Precio Total:{" "}
                    {new Intl.NumberFormat("es-CO", {
                      style: "currency",
                      currency: "COP",
                      minimumFractionDigits: 0,
                    }).format(product.precio * product.quantity)}
                  </p>
                  {/* Botón para eliminar el producto del carrito */}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeFromCart(product.id)}
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Contenedor del total */}
          <div className="cart-total">
            <hr /> {/* Línea separadora */}
            <p className="total-text">
              <strong>Total:</strong>{" "}
              {new Intl.NumberFormat("es-CO", {
                style: "currency",
                currency: "COP",
                minimumFractionDigits: 0,
              }).format(totalPrice)}
            </p>
            {/* Botón para proceder al pago */}
            {totalItemsInCart > 0 && (
              <Button
                className="bg-green text-white w-100 mt-3"
                onClick={handleCheckout}
              >
                {user ? "Ir a pagar" : "Inicia sesión para continuar"}
              </Button>
            )}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </Navbar>
  );
}

export default MyNavbar; // Exporta el componente para que pueda ser utilizado en otras partes de la aplicación
