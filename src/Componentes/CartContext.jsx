import { createContext, useContext, useState, useEffect } from "react";

// Creación del contexto del carrito de compras
const CartContext = createContext();

// Proveedor del contexto que envolverá la aplicación y permitirá gestionar el carrito
export const CartProvider = ({ children }) => {
  // Estado para almacenar los productos en el carrito
  const [cart, setCart] = useState(() => {
    // Cargar el carrito desde localStorage al iniciar la aplicación
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Estado para mostrar u ocultar el menú del carrito
  const [showCartMenu, setShowCartMenu] = useState(false);
  
  // Estado para almacenar mensajes de error relacionados con el carrito
  const [errorMessage, setErrorMessage] = useState("");

  // useEffect para guardar el carrito en localStorage cada vez que se modifique
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Función para agregar productos al carrito
  const addToCart = (product, quantity) => {
    // Buscar si el producto ya está en el carrito
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      // Calcular la nueva cantidad si el producto ya está en el carrito
      const totalQuantity = existingProduct.quantity + quantity;

      // Verificar si hay suficiente stock disponible
      if (totalQuantity > product.stock) {
        setErrorMessage(
          `No hay suficiente stock disponible. Solo puedes agregar ${
            product.stock - existingProduct.quantity
          } unidades más.`
        );
        return;
      } else {
        // Actualizar la cantidad del producto en el carrito
        setCart(
          cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        );
        setErrorMessage(""); // Limpiar el mensaje de error si la acción es válida
      }
    } else {
      // Si el producto no está en el carrito, verificar disponibilidad antes de agregarlo
      if (quantity > product.stock) {
        setErrorMessage(
          `No hay suficiente stock disponible. Solo puedes agregar ${product.stock} unidades.`
        );
        return;
      } else {
        // Agregar el producto al carrito con la cantidad seleccionada
        setCart([...cart, { ...product, quantity }]);
        setErrorMessage(""); // Limpiar el mensaje de error
      }
    }

    setShowCartMenu(true); // Mostrar el carrito después de agregar un producto
  };

  // Función para aumentar la cantidad de un producto en el carrito
  const increaseQuantity = (productId) => {
    setCart(
      cart.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Función para disminuir la cantidad de un producto en el carrito
  const decreaseQuantity = (productId) => {
    setCart(
      cart.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  // Función para vaciar completamente el carrito
  const clearCart = () => {
    setCart([]); // Se vacía el estado del carrito
    localStorage.removeItem("cart"); // También se borra del almacenamiento local
  };

  return (
    // Proveer el contexto del carrito a los componentes hijos
    <CartContext.Provider
      value={{
        cart, // Estado del carrito
        addToCart, // Función para agregar productos
        increaseQuantity, // Función para aumentar la cantidad de un producto
        decreaseQuantity, // Función para disminuir la cantidad de un producto
        removeFromCart, // Función para eliminar un producto
        showCartMenu, // Estado que controla si se muestra el menú del carrito
        setShowCartMenu, // Función para modificar el estado del menú del carrito
        errorMessage, // Mensaje de error en caso de stock insuficiente
        setErrorMessage, // Función para modificar el mensaje de error
        clearCart, // Función para vaciar el carrito completamente
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para acceder al contexto del carrito en cualquier componente
export const useCart = () => useContext(CartContext);
