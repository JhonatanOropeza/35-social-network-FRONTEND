import React, { useState } from 'react'
import Axios from 'axios';

import LoadingDos from '../Loading/loadingDos';
import LoadImageButton from './loadImagebutton';
import ImageLoaded from './imageLoaded';
import Main from '../General/Main';

const baseURL = process.env.REACT_APP_RUTA_PRINCIPAL;

//------------------------ 1.- CSS Style ---------------------------------
const heightForImage = {
    height: '200px'
}
//---------------------------- 2.- SOME FUNCTIONS--------------------------------------
//---------------------------- 3.- LOADIMAGES--------------------------------------
export default function LoadImage({ history, mostrarError }) {
    const [imagenURL, setImagenURL] = useState('');//URL gotten from the backend when the image was loaded in the server
    const [subiendoImagen, setSubiendoImagen] = useState(false);// For the loading
    const [enviandoPost, setEnviandoPost] = useState(false);//For the finel post
    const [mensajeDelPost, setMensajeDelPost] = useState('');

    //---------------------------- 3.1- Functions--------------------------------------
    async function handleImagenSeleccionada(evento) {
        try {
            setSubiendoImagen(true);
            const file = evento.target.files[0];
            const formData = new FormData();
            formData.append('image', file);

            const { data } = await Axios.post(baseURL + '/inside/postImage', formData, { headers: { "Content-type": "multipart/form-data" } });
            setImagenURL(data.url);
            setSubiendoImagen(false);
        } catch (error) {
            setSubiendoImagen(false);
            console.log(error.response.data.message);
            mostrarError(error.response.data.message);
            //console.log(error.response.data.message)
        }
    }

    async function handleSubmit(evento) {
        evento.preventDefault();
        //1.- En caso de que el post este cargando, evitamos la acción dle boton
        if (enviandoPost) {
            return;
        }
        //2.- Si la imagen esta subiendo, mostramos mensaje
        if (subiendoImagen) {
            mostrarError('No se ha terminado de cargar la imagen');
            return;
        }
        //3.- Si no hay imagen, invitamos a que se cargue
        if (!imagenURL) {
            mostrarError('Primero debes cargar una imagen');
            return;
        }

        try {
            setEnviandoPost(true);
            const body = {
                mensajeDelPost,
                url: imagenURL
            }
            await Axios.post(baseURL + '/inside/postImageWithData', body)
            setEnviandoPost(false);
            history.push('/');
        } catch (error) {
            setEnviandoPost(false);
            mostrarError.mostrarError(error.response.data.message);
            console.log(error);
        }
    }
    //---------------------------- 3.2 Return--------------------------------------
    return (
        <Main>
            <div className="container text-center">
                <h5 className="pt-2">Cargar imagen</h5>
                <form
                    encType="multipart/form-data"
                    style={{ maxWidth: '510px' }}
                    className="container"
                    onSubmit={handleSubmit}>
                    <div className="form-group" >
                        <div
                            className="form-control mt-2 bg-white d-flex align-items-center justify-content-center"
                            style={heightForImage}>

                            <QueMostrarEnRecuadro
                                imagenURL={imagenURL}
                                subiendoImagen={subiendoImagen}
                                handleImagenSeleccionada={handleImagenSeleccionada}
                            />
                        </div>
                        <textarea
                            name="imagen"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            className="form-control mt-2"
                            value={mensajeDelPost}
                            onChange={e => setMensajeDelPost(e.target.value)}
                            required
                            placeholder="Inserte descripción aqui"
                        />
                        <button
                            type="submit"
                            className="btn btn-primary mt-2"
                        >Publicar</button>
                    </div>
                </form>
            </div>
        </Main>
    );
}
//---------------------------- 4 Other components --------------------------------------
function QueMostrarEnRecuadro({ imagenURL, subiendoImagen, handleImagenSeleccionada }) {
    if (subiendoImagen) {
        return <LoadingDos/>
    } else if (imagenURL) {
        return (
            <ImageLoaded imagenURL={imagenURL} />
        );
    } else {
        return (
            <LoadImageButton handleImagenSeleccionada={handleImagenSeleccionada} />
        );
    }
}

