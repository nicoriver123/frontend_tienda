import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage
} from 'mdb-react-ui-kit';

const Perfil = () => {
  // Estado para almacenar los datos del perfil
  const [perfilData, setPerfilData] = useState(null);
  // Estado para manejar errores en la solicitud
  const [error, setError] = useState(null);
  // Estado para indicar si los datos están cargando
  const [loading, setLoading] = useState(true);

  // useEffect se ejecuta cuando el componente se monta
  useEffect(() => {
    const fetchPerfilData = async () => {
      try {
        const token = localStorage.getItem('token'); // Recupera el token almacenado en localStorage
        // Realiza la solicitud GET para obtener los datos del perfil del usuario
        const response = await axios.get('http://localhost:8080/api/usuario/perfil', {
          headers: {
            'Authorization': `Bearer ${token}` // Incluye el token en los headers para autenticación
          }
        });
        setPerfilData(response.data); // Almacena los datos del perfil en el estado
        setLoading(false); // Indica que los datos han terminado de cargar
      } catch (err) {
        // Captura cualquier error y lo almacena en el estado
        setError(err.response?.data?.message || 'Error al cargar los datos del perfil');
        setLoading(false);
      }
    };

    fetchPerfilData(); // Llama a la función para obtener los datos
  }, []); // Se ejecuta solo una vez cuando el componente se monta

  // Si los datos aún están cargando, muestra un mensaje de carga
  if (loading) {
    return (
      <MDBContainer className="py-5">
        <div className="text-center">Cargando perfil...</div>
      </MDBContainer>
    );
  }

  // Si hay un error en la solicitud, muestra el mensaje de error
  if (error) {
    return (
      <MDBContainer className="py-5">
        <div className="text-center text-danger">{error}</div>
      </MDBContainer>
    );
  }

  // Renderiza el perfil del usuario si los datos se cargaron correctamente
  return (
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">
        

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                <p className="text-muted mb-1">@{perfilData?.username}</p>
                <p className="text-muted mb-4">Usuario</p>
                
              </MDBCardBody>
            </MDBCard>

            
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Nombre</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{perfilData?.nombre || 'No especificado' }</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{perfilData?.email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Telefono</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{perfilData?.telefono || 'No especificado' }</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Pais</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{perfilData?.pais || 'No especificado' }</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

           
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
export default Perfil;