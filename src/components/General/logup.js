import React from 'react'
import { useState } from 'react';
import imageSign from '../../images/newSignup.png';
import { Link } from 'react-router-dom';

import Main from './Main';

//const baseURL = process.env.REACT_APP_RUTA_PRINCIPAL;

export default function Login({ logup, mostrarError }) {
    const [datosLogup, setDatosLogup] = useState(
        {
            nombre: '',
            correo: '',
            contrasena: ''
        }
    )

    // ---------------------------------
    //          FUNCTIONS
    // ---------------------------------
    function handleInputChange(e) {
        setDatosLogup({
            ...datosLogup,//Destruturación, pone las propiedades iguales
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await logup(datosLogup.nombre, datosLogup.correo, datosLogup.contrasena);
        } catch (error) {
            //console.log(error.response.data)
            mostrarError(error.response.data.message);
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
                    <div className="col-sm-6 weight__log-img">
                        <img src={imageSign} className="img-fluid weight__log-img-src" alt=""/>
                    </div>
                    {/** FORMULARIO */}
                    <div className="col-sm-6 weight__log-form">
                        <div className="container mt-2 mb-2">
                            <h3>ShareImage</h3>
                            <p className="text-secondary">Registrate para ver el contenido de la red social</p>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Nombre</label>
                                    <input
                                        onChange={handleInputChange}
                                        type="text"
                                        name="nombre"
                                        className="form-control"
                                        id="nombre"
                                        aria-describedby="emailHelp"
                                        value={datosLogup.nombre}
                                        required />
                                </div>
                                <div className="form-group">
                                    <label>Correo</label>
                                    <input
                                        onChange={handleInputChange}
                                        type="email"
                                        name="correo"
                                        className="form-control"
                                        id="correo"
                                        aria-describedby="emailHelp"
                                        value={datosLogup.correo}
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
                                        value={datosLogup.contrasena}
                                        required />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >Registrate</button>
                                <p className="mt-3">Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Main>
    );
}