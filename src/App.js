import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
//Styles CSS
import 'bootstrap/dist/css/bootstrap.min.css';

//Components
import Navbar from './components/General/navbar';
import Logup from './components/General/logup';
import Login from './components/General/login';
import Loading from './components/Loading/loading';
import Feed from './components/Feed/Feed';
import Error from './components/General/error';
import LoadImage from './components/Upload/loadImage';
import Explore from './components/Explore/Explore';
import GetOnePost from './components/GetOnePost/GetOnePost'
import Profile from './components/Profile/Profile';
import Main from './components/General/Main'
//Others
import { setToken, getToken, initAxiosInterceptors, deleteToken } from './helpers/auth_helpers';
const baseURL = process.env.REACT_APP_RUTA_PRINCIPAL;

//En caso de tener token, agrega datos del usuario al headers para conocer el usuario
initAxiosInterceptors();

function App() {
  const [usuario, setUsuario] = useState(null);
  const [cargandoUsuario, setCargandoUsuario] = useState(true);
  const [error, setError] = useState(null);

  // ---------------------------------------------------------------
  // ---------------------------------------------------------------
  //                          FUNCTIONS
  // ---------------------------------------------------------------
  // ---------------------------------------------------------------

  useEffect(() => {
    //En caso de que haya toekn en LocalStorage
    async function cargarUsuario() {
      if (!getToken()) {
        setCargandoUsuario(false);
        return;
      }
      try {
        const { data } = await Axios.get(baseURL + '/inside/whoami');
        setUsuario(data.user);
        setCargandoUsuario(false);
      } catch (error) {
        console.log(error)
      }
    }
    cargarUsuario();
  }, []);

  async function login(correo, contrasena) {
    const { data } = await Axios.post(baseURL + '/login', {
      correo,
      contrasena
    });
    //console.log(data)
    setUsuario(data.user);
    setToken(data.token);
  }

  async function logup(nombre, correo, contrasena) {
    const { data } = await Axios.post(baseURL + '/logup', {
      nombre,
      correo,
      contrasena
    });
    //console.log(data.user)
    setUsuario(data.user);
    setToken(data.token);
  }

  function mostrarError(mensaje) {
    setError(mensaje);
  }

  function ocultarError() {
    setError(null)
  }
  function logout() {
    setUsuario(null);
    deleteToken();
  }

  // ---------------------------------------------------------------
  // ---------------------------------------------------------------
  //                          JSX
  // ---------------------------------------------------------------
  // ---------------------------------------------------------------
  if (cargandoUsuario) {
    return ( 
        <Main X_Y_Centered ={true}>
          <Loading></Loading>
        </Main>
    );
  }

  return (
    <Router>
        <Navbar usuario={usuario} logout={logout}/>
        <Error mensaje={error} ocultarError={ocultarError} />
        {
          usuario
            ? (
              <AlreadyAuthenticated mostrarError={mostrarError} usuario={usuario} logout={logout}/>
            ) : (
              <LogRoutes login={login} logup={logup} mostrarError={mostrarError} />
            )
        }
    </Router>
  );
}

export default App;

// ---------------------------------------------------------------
// ---------------------------------------------------------------
//                          OTHER COMPONENTS
// ---------------------------------------------------------------
// ---------------------------------------------------------------
function AlreadyAuthenticated({mostrarError, usuario, logout}) {
  return (
    <Switch>
      <Route
        path="/loadImage"
        render={props => <LoadImage {...props} mostrarError={mostrarError} ></LoadImage>}
      />
      <Route
        path="/explore"
        render={props => <Explore {...props} mostrarError={mostrarError} ></Explore>}
      />
      <Route
        path="/getOnePost/:id"
        render={props => <GetOnePost {...props} mostrarError={mostrarError} usuario={usuario} ></GetOnePost>}
      />
      <Route
        path="/profile/:usuario"
        render={props => <Profile {...props} mostrarError={mostrarError} usuario={usuario} logout={logout}></Profile>}
      />
      <Route
        path="/"
        render={props => <Feed {...props} mostrarError={mostrarError} ></Feed>}
        default
      />
    </Switch>
  );
}

function LogRoutes({ login, logup, mostrarError }) {
  return (
    <Switch>
      <Route
        path="/login/"
        render={props => <Login {...props} login={login} mostrarError={mostrarError}></Login>}
      />
      <Route
        render={props => <Logup {...props} logup={logup} mostrarError={mostrarError}></Logup>}
        default
      />
    </Switch>
  );
}