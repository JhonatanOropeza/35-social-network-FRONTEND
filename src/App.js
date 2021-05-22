import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
import { UsuarioProvider, useUsuario } from './components/0_Context/usuario-context';
import { initAxiosInterceptors } from './helpers/auth_helpers';

//En caso de tener token, agrega datos del usuario al headers para conocer el usuario
initAxiosInterceptors();

export default () => <UsuarioProvider>
  <App></App>
</UsuarioProvider>

function App() {
  const {usuario, cargandoUsuario} = useUsuario();
  const [error, setError] = useState(null);
  // ---------------------------------------------------------------
  // ---------------------------------------------------------------
  //                          FUNCTIONS
  // ---------------------------------------------------------------
  // ---------------------------------------------------------------
  function mostrarError(mensaje) {
    setError(mensaje);
  }

  function ocultarError() {
    setError(null)
  }

  // ---------------------------------------------------------------
  // ---------------------------------------------------------------
  //                          JSX
  // ---------------------------------------------------------------
  // ---------------------------------------------------------------
  if (cargandoUsuario) {
    return (
      <Main X_Y_Centered={true}>
        <Loading></Loading>
      </Main>
    );
  }

  return (
    <Router>
      <Navbar />
      <Error mensaje={error} ocultarError={ocultarError} />
      {
        usuario
          ? (
            <AlreadyAuthenticated mostrarError={mostrarError}/>
          ) : (
            <LogRoutes mostrarError={mostrarError} />
          )
      }
    </Router>
  );
}

// ---------------------------------------------------------------
// ---------------------------------------------------------------
//                          OTHER COMPONENTS
// ---------------------------------------------------------------
// ---------------------------------------------------------------
function AlreadyAuthenticated({ mostrarError }) {
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
        render={props => <GetOnePost {...props} mostrarError={mostrarError} ></GetOnePost>}
      />
      <Route
        path="/profile/:usuario"
        render={props => <Profile {...props} mostrarError={mostrarError} ></Profile>}
      />
      <Route
        path="/"
        render={props => <Feed {...props} mostrarError={mostrarError} ></Feed>}
        default
      />
    </Switch>
  );
}

function LogRoutes({ mostrarError }) {
  return (
    <Switch>
      <Route
        path="/login/"
        render={props => <Login {...props} mostrarError={mostrarError}></Login>}
      />
      <Route
        render={props => <Logup {...props}  mostrarError={mostrarError}></Logup>}
        default
      />
    </Switch>
  );
}