
import React, { useEffect, useState } from "react"; // Importa React y los hooks useEffect y useState
import axios from "axios"; // Importa Axios para hacer solicitudes HTTP
import { Card, Button } from "react-bootstrap"; // Importa componentes de Bootstrap
import { MdChevronLeft, MdChevronRight } from "react-icons/md"; // Importa íconos para la navegación
import "../stylesheets/ProductSlider.css"; // Importa los estilos CSS para el slider de productos

const ProductSlider = () => {
  // Estado para almacenar la lista de productos
  const [products, setProducts] = useState([]);

  // useEffect se ejecuta cuando el componente se monta
  useEffect(() => {
    // Realiza una petición GET para obtener los productos desde el backend
    axios
      .get("http://localhost:8080/api/productos")
      .then((response) => {
        setProducts(response.data); // Guarda los productos en el estado
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
      });
  }, []); // El array vacío indica que solo se ejecuta una vez al montar el componente

  // Función para desplazar el slider hacia la izquierda
  const slideLeft = () => {
    const slider = document.getElementById("product-slider");
    slider.scrollLeft = slider.scrollLeft - 300; // Mueve el scroll 300px a la izquierda
  };

  // Función para desplazar el slider hacia la derecha
  const slideRight = () => {
    const slider = document.getElementById("product-slider");
    slider.scrollLeft = slider.scrollLeft + 300; // Mueve el scroll 300px a la derecha
  };

  return (
    <div className="product-slider-container">
      {/* Botón de navegación izquierda */}
      <MdChevronLeft
        size={40}
        className="slider-icon left"
        onClick={slideLeft}
      />

      {/* Contenedor del slider */}
      <div id="product-slider" className="product-slider">
        {/* Muestra un mensaje de carga si no hay productos */}
        {products.length === 0 ? (
          <p>Cargando productos...</p>
        ) : (
          // Mapea los productos y crea una tarjeta para cada uno
          products.map((product) => (
            <div className="product-card" key={product.id}>
              <Card style={{ width: "18rem" }}>
                {/* Imagen del producto, asegurando la ruta correcta */}
                <Card.Img
                  variant="top"
                  src={`http://localhost:8080${product.imagenUrl}`}
                />

                <Card.Body>
                  <Card.Title>{product.nombre}</Card.Title>{" "}
                  {/* Nombre del producto */}
                  <Card.Text>
                    <strong>Precio:</strong>{" "}
                    {new Intl.NumberFormat("es-CO", {
                      style: "currency",
                      currency: "COP",
                      minimumFractionDigits: 0,
                    }).format(product.precio)}
                  </Card.Text>
                  {/* Precio del producto */}
                  <Button variant="primary">Ver Producto</Button>{" "}
                  {/* Botón para ver más detalles */}
                </Card.Body>
              </Card>
            </div>
          ))
        )}
      </div>

      {/* Botón de navegación derecha */}
      <MdChevronRight
        size={40}
        className="slider-icon right"
        onClick={slideRight}
      />
    </div>
  );
};

export default ProductSlider;

