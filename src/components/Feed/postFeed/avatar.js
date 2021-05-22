import React from 'react';
import { Link } from 'react-router-dom';
import stringToColor from 'string-to-color';

import LoadingDos from './../../Loading/loadingDos'

//---------------------------- 1.- CSS Style && .env ----------------------------------
import './Avatar.css';
//---------------------------- 2.- Some functions -------------------------------------
//---------------------------- 3.- PRINCIAPAL COMPONENT -------------------------------
export default function Avatar({
    usuario,
    width,
    height,
    tipoDeAvatar,
    //Props para tipo de imagen 3
    checkUserLogged_UserOfProfile,
    subiendoImagen,
    handleSubirImagen
}) {
    //---------------------------- 3.1- Functions----------------------------------
    let newWidth, newHeight;
    //En caso de que no lleguen valores, se les coloca en 50
    !width ? newWidth = 50 : newWidth = width;
    !height ? newHeight = 50 : newHeight = height;
    //Estableciendo estilos del cirulo
    const newStyle = {
        backgroundImage: usuario.imagen ? `url(${usuario.imagen})` : null,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: stringToColor(usuario.nombre),
        width: newWidth + "px",
        height: newHeight + "px",
    }
    const newStyle3 = {
        backgroundImage: usuario.imagen ? `url(${usuario.imagen})` : null,
        backgroundColor: stringToColor(usuario.nombre),
        width: newWidth + "px",
        height: newHeight + "px",
    }

    //Alineación del avatar
    if (tipoDeAvatar === 1) {
        //Para usarse en el EXPLORE
        return (
            <img
                style={newStyle}
                className="rounded-circle"
                alt=""
            >
            </img>
        );
    }
    if (tipoDeAvatar === 2) {
        //Para usarse en POST of FEED and GET-ONE-POST
        return (
            <div className="container pt-1 pb-1 text-left d-flex justify-content-start align-items-center">
                <img
                    style={newStyle}
                    className="rounded-circle"
                    alt=""
                >
                </img>
                <Link to={`/profile/${usuario._id}`}>
                    <h6 className="ml-2">{usuario.nombre}</h6>
                </Link>
            </div>
        );
    }
    if (tipoDeAvatar === 3) {
        //Para usarse en PROFILE
        if (subiendoImagen) {
            return (
                <LoadingDos />
            );
        } else if (checkUserLogged_UserOfProfile) {
            //Cuando el usuario logeado esta vistando su perfil
            return (
                <label
                    style={newStyle3}
                    className="rounded-circle mb-0 avatar3"
                    alt=""
                >
                    <input
                        type="file"
                        onChange={handleSubirImagen}
                        className="sr-only"
                        name="imageProfile"
                    />
                </label>
            );
        } else {
            //Cuando el usuario logeado visita el perfil de otra persona
            return (
                <div className="text-center">
                    <img
                        style={newStyle}
                        className="rounded-circle"
                        alt=""
                    >
                    </img>
                </div>
            );
        }
    }
}
