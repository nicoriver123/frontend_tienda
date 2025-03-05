import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
} from "mdb-react-ui-kit";
import UsuarioService from "../services/UsuarioService"; // Importa el servicio para interactuar con el backend.
import "../stylesheets/Perfil.css"; // Importa los estilos CSS para este componente.
import Button from "react-bootstrap/Button"; // Importa el componente Button de React Bootstrap.
import Modal from "react-bootstrap/Modal"; // Importa el componente Modal de React Bootstrap.
import Form from "react-bootstrap/Form"; // Importa el componente Form de React Bootstrap.
import { ToastContainer, toast } from "react-toastify"; // Importa ToastContainer y toast para notificaciones.
import "react-toastify/dist/ReactToastify.css"; // Importa los estilos de react-toastify.
import "@fortawesome/fontawesome-free/css/all.min.css"; // Importa los estilos de FontAwesome para íconos.

const Perfil = () => {
  // Estado para almacenar los datos del perfil del usuario.
  const [perfilData, setPerfilData] = useState(null);

  // Estado para manejar errores en las solicitudes.
  const [error, setError] = useState(null);

  // Estado para indicar si los datos están cargando.
  const [loading, setLoading] = useState(true);

  // Estado para controlar la visibilidad del modal de edición.
  const [show, setShow] = useState(false);

  // Estado para almacenar los datos del formulario de edición.
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    pais: "",
  });

  // Función para cerrar el modal de edición.
  const handleClose = () => setShow(false);

  // Función para abrir el modal de edición.
  const handleShow = () => setShow(true);

  // Configuración para notificaciones de éxito.
  const notifySuccess = (message) =>
    toast.success(message, {
      position: "top-right", // Posición de la notificación.
      autoClose: 3000, // Duración de la notificación en milisegundos.
      hideProgressBar: false, // Muestra la barra de progreso.
      closeOnClick: true, // Cierra la notificación al hacer clic.
      pauseOnHover: true, // Pausa el cierre automático al pasar el mouse.
      draggable: true, // Permite arrastrar la notificación.
    });

  // Configuración para notificaciones de error.
  const notifyError = (message) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

  // Efecto para cargar los datos del perfil cuando el componente se monta.
  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        // Obtiene los datos del perfil desde el backend.
        const datos = await UsuarioService.getPerfil();

        // Actualiza el estado con los datos del perfil.
        setPerfilData(datos);

        // Actualiza el estado del formulario con los datos del perfil.
        setFormData({
          nombre: datos.nombre || "",
          email: datos.email || "",
          telefono: datos.telefono || "",
          pais: datos.pais || "",
        });

        // Indica que los datos ya no están cargando.
        setLoading(false);
      } catch (err) {
        // Maneja errores al cargar los datos del perfil.
        const errorMsg =
          err.response?.data?.message || "Error al cargar los datos del perfil";
        setError(errorMsg); // Actualiza el estado de error.
        notifyError(errorMsg); // Muestra una notificación de error.
        setLoading(false); // Indica que los datos ya no están cargando.
      }
    };

    // Llama a la función para cargar el perfil.
    cargarPerfil();
  }, []); // El array vacío asegura que este efecto solo se ejecute una vez.

  // Función para manejar cambios en los campos del formulario.
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Actualiza el estado del formulario con los nuevos valores.
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Función para manejar el envío del formulario de edición.
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que el formulario recargue la página.

    try {
      // Envía los datos actualizados al backend.
      const datosActualizados = await UsuarioService.actualizarPerfil(formData);

      // Actualiza el estado con los nuevos datos del perfil.
      setPerfilData(datosActualizados);

      // Cierra el modal de edición.
      handleClose();

      // Muestra una notificación de éxito.
      notifySuccess("¡Perfil actualizado exitosamente!");
    } catch (err) {
      // Maneja errores al actualizar el perfil.
      const errorMsg =
        err.response?.data?.message || "Error al actualizar el perfil";
      setError(errorMsg); // Actualiza el estado de error.
      notifyError(errorMsg); // Muestra una notificación de error.
    }
  };

  // Función para manejar la subida de la imagen de perfil.
  const handleImageUpload = async (e) => {
    const file = e.target.files[0]; // Obtiene el archivo seleccionado.
    if (!file) return; // Si no hay archivo, no hace nada.

    // Crea un objeto FormData para enviar el archivo al backend.
    const formData = new FormData();
    formData.append("imagen", file);

    try {
      // Envía la imagen al backend para actualizar la imagen de perfil.
      const datosActualizados = await UsuarioService.actualizarImagenPerfil(
        formData
      );

      // Actualiza el estado con los nuevos datos del perfil.
      setPerfilData(datosActualizados);

      // Muestra una notificación de éxito.
      notifySuccess("¡Imagen de perfil actualizada exitosamente!");
    } catch (err) {
      // Maneja errores al actualizar la imagen de perfil.
      const errorMsg =
        err.response?.data?.message ||
        "Error al actualizar la imagen de perfil";
      setError(errorMsg); // Actualiza el estado de error.
      notifyError(errorMsg); // Muestra una notificación de error.
    }
  };

  // Si los datos aún están cargando, muestra un mensaje de carga.
  if (loading) {
    return (
      <MDBContainer className="py-5">
        <div className="text-center">Cargando perfil...</div>
      </MDBContainer>
    );
  }

  // Si hay un error en la solicitud, muestra el mensaje de error.
  if (error && !loading) {
    return (
      <MDBContainer className="py-5">
        <ToastContainer /> {/* Contenedor para las notificaciones. */}
        <div className="text-center text-danger">{error}</div>
      </MDBContainer>
    );
  }

  // Renderiza el perfil del usuario si los datos se cargaron correctamente
  return (
    <section>
     <ToastContainer /> {/* Contenedor para las notificaciones. */}
      <MDBContainer className="py-5">
        <MDBRow>
          {/* Columna izquierda: Imagen de perfil y nombre de usuario. */}
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <div className="position-relative d-inline-block profile-image-container">
                  {/* Imagen de perfil del usuario. */}
                  <MDBCardImage
                    src={
                      perfilData?.imagenUrl
                        ? `http://localhost:8080${perfilData.imagenUrl}`
                        : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    }
                    alt="avatar"
                    className="profile-avatar-image"
                    fluid
                  />
                  {/* Ícono de cámara para subir una nueva imagen. */}
                  <div className="profile-camera-icon">
                    <label
                      htmlFor="file-upload"
                      className="profile-camera-label"
                    >
                      <i className="fas fa-camera text-white"></i>
                    </label>
                    {/* Input para seleccionar una nueva imagen. */}
                    <Form.Control
                      id="file-upload"
                      type="file"
                      className="profile-file-input"
                      onChange={handleImageUpload}
                      accept="image/*"
                    />
                  </div>
                </div>
                {/* Nombre de usuario. */}
                <p className="text-muted mb-1 mt-3">@{perfilData?.username}</p>
                <p className="text-muted mb-1 mt-3">Usuario</p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          {/* Columna derecha: Información del perfil. */}
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                {/* Nombre del usuario. */}
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Nombre</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {perfilData?.nombre || "No especificado"}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />

                {/* Email del usuario. */}
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {perfilData?.email}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />

                {/* Teléfono del usuario. */}
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Telefono</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {perfilData?.telefono || "No especificado"}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />

                {/* País del usuario. */}
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Pais</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {perfilData?.pais || "No especificado"}
                    </MDBCardText>
                  </MDBCol>
                  <hr />
                  {/* Botón para abrir el modal de edición. */}
                  <Button variant="primary" onClick={handleShow}>
                    Editar
                  </Button>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      {/* Modal de edición del perfil. */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Formulario para editar el perfil. */}
          <Form onSubmit={handleSubmit}>
            {/* Campo para el nombre. */}
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            {/* Campo para el email. */}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            {/* Campo para el teléfono. */}
            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
              />
            </Form.Group>

            {/* Campo para el país. */}
            <Form.Group className="mb-3">
              <Form.Label>País</Form.Label>
              <Form.Control
                type="text"
                name="pais"
                value={formData.pais}
                onChange={handleInputChange}
              />
            </Form.Group>

            {/* Botón para guardar los cambios. */}
            <Button variant="primary" type="submit">
              Guardar Cambios
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default Perfil;