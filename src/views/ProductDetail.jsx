import React, { useEffect, useState } from "react"; // Importa React y los hooks useEffect y useState
import { useParams } from "react-router-dom"; // Hook para obtener parámetros de la URL
import axios from "axios"; // Librería para hacer peticiones HTTP
import { Card, Button, Spinner, Row, Col, Container } from "react-bootstrap"; // Componentes de Bootstrap para estilos y estructura
import { useCart } from "../Componentes/CartContext"; // Importa el contexto del carrito para gestionar productos en el carrito
import "../stylesheets/ProductDetails.css"; // Importa los estilos CSS específicos para esta página

const ProductDetail = () => {
  const { id } = useParams(); // Obtiene el ID del producto desde la URL
  const [product, setProduct] = useState(null); // Estado para almacenar los detalles del producto
  const [loading, setLoading] = useState(true); // Estado para manejar la carga de datos
  const [error, setError] = useState(""); // Estado para manejar errores
  const { addToCart, setShowCartMenu, errorMessage } = useCart(); // Funciones del contexto del carrito
  const [quantity, setQuantity] = useState(1); // Estado para manejar la cantidad seleccionada del producto

  // useEffect se ejecuta al montar el componente y cuando cambia el ID del producto
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Realiza una petición GET para obtener los detalles del producto según el ID
        const response = await axios.get(
          `http://localhost:8080/api/productos/${id}`
        );
        setProduct(response.data); // Guarda la información del producto en el estado
      } catch (err) {
        setError("Error al cargar el producto"); // Si hay un error, lo almacena en el estado
      } finally {
        setLoading(false); // Finaliza la carga de datos
      }
    };

    fetchProduct();
  }, [id]); // Se ejecuta cada vez que el ID del producto cambia

  // Si el producto está cargando, muestra un spinner de carga
  if (loading) {
    return <Spinner animation="border" />;
  }

  // Si hubo un error en la carga, muestra un mensaje de error
  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  // Función para aumentar la cantidad del producto (sin exceder el stock disponible)
  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  // Función para disminuir la cantidad del producto (mínimo 1 unidad)
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Calcula el precio total basado en la cantidad seleccionada
  const totalPrice = product.precio * quantity;

  return (
    <Container className="product-detail-container">
      <Card className="product-detail-card">
        <Row className="g-0">
          {/* Columna de la imagen del producto */}
          <Col md={6}>
            <Card.Img
              variant="top"
              src={`http://localhost:8080${product.imagenUrl}`} // Obtiene la imagen desde el servidor
              className="product-detail-img"
            />
          </Col>

          {/* Columna con los detalles del producto */}
          <Col md={6}>
            <Card.Body>
              <Card.Title>{product.nombre}</Card.Title>
              <Card.Text>
                <strong>Descripción:</strong> {product.descripcion}
              </Card.Text>
              <Card.Text>
                <strong>Precio Unitario:</strong>{" "}
                {new Intl.NumberFormat("es-CO", {
                  style: "currency",
                  currency: "COP",
                  minimumFractionDigits: 0,
                }).format(product.precio)}
              </Card.Text>
              <Card.Text>
                <strong>Stock:</strong> {product.stock}
              </Card.Text>

              {/* Controles para seleccionar la cantidad */}
              <div className="quantity-container">
                <Button variant="secondary" onClick={decreaseQuantity}>
                  -
                </Button>
                <span className="quantity">{quantity}</span>
                <Button variant="secondary" onClick={increaseQuantity}>
                  +
                </Button>
              </div>

              {/* Muestra el precio total según la cantidad seleccionada */}
              <Card.Text>
                <strong>Precio Total:</strong>{" "}
                {new Intl.NumberFormat("es-CO", {
                  style: "currency",
                  currency: "COP",
                  minimumFractionDigits: 0,
                }).format(totalPrice)}
              </Card.Text>

              {/* Mensaje de error si hay algún problema con la adición al carrito */}
              {errorMessage && (
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}

              {/* Botón para agregar al carrito */}
              <Button
                variant="primary"
                onClick={() => {
                  addToCart(product, quantity); // Agrega el producto al carrito con la cantidad seleccionada
                  setShowCartMenu(true); // Muestra el carrito automáticamente
                }}
              >
                Agregar al Carrito
              </Button>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default ProductDetail;

