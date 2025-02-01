

import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

// Asumiendo que tienes tus imágenes en la carpeta 'public' o 'src/imagenes'
import img1 from '../imagenes/img1.jpg'; // Cambia por tu ruta de imagen
import img2 from '../imagenes/img2.jpg'; // Cambia por tu ruta de imagen
import img3 from '../imagenes/img3.jpg'; // Cambia por tu ruta de imagen
import ProductSlider from './ProductSlider';


function Home() {
  return (
    <div id="main-carousel" className="carousel">
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img1} // Ruta de la imagen
          alt="First slide"
        />
      
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img2} // Ruta de la imagen
          alt="Second slide"
        />
        
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img3} // Ruta de la imagen
          alt="Third slide"
        />
       
      </Carousel.Item>
    </Carousel>

<ProductSlider />
</div>
  );
}

export default Home;
