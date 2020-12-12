import React from 'react';
import { useState } from 'react';
import imageSign from '../../images/newSignup.png';
import { Link } from 'react-router-dom';

import Main from './Main';
import './general.css';
//const baseURL = process.env.REACT_APP_RUTA_PRINCIPAL;

export default function Login({ login, mostrarError }) {
    const [datosLogin, setDatosLogin] = useState(
        {
            correo: '',
            contrasena: ''
        }
    )

    // ---------------------------------
    //          FUNCTIONS
    // ---------------------------------
    function handleInputChange(e) {
        setDatosLogin({
            ...datosLogin,//Destruturación, pone las propiedades iguales
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await login(datosLogin.correo, datosLogin.contrasena);
        } catch (error) {
            //console.log(error.response.data)
            mostrarError(error.response.data.message)
            console.log(error)
        }
    }
    // ---------------------------------
    //          JSX
    // ---------------------------------
    return (
        <Main X_Y_Centered={false}>
            <div className="container-fluid container__log">
                <div className="row weight__form">
                    {/** IMAGEN */}
                    <div className="col-sm-6 weight__log-img ">
                        <img src={imageSign} className="img-fluid weight__log-img-src" alt=""/>
                    </div>
                     {/** FORMULARIO */}
                    <div className="col-sm-6 weight__log-form text-center">
                        <div className="container mt-2 mb-2">
                            <h3>ShareImage</h3>
                            <p className="text-secondary">Inicia sesión para mirar y compartir contenido</p>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Correo</label>
                                    <input
                                        onChange={handleInputChange}
                                        type="email"
                                        name="correo"
                                        className="form-control"
                                        id="correo"
                                        aria-describedby="emailHelp"
                                        value={datosLogin.correo}
                                        required />
                                </div>
                                <div className="form-group">
                                    <label>Contraseña</label>
                                    <input
                                        onChange={handleInputChange}
                                        type="password"
                                        name="contrasena"
                                        className="form-control"
                                        id="contraseña"
                                        value={datosLogin.contrasena}
                                        required />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >Iniciar sesión</button>
                                <p className="mt-3">No tienes cuenta <Link to="/logup">Registrate</Link></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Main>
    );
}