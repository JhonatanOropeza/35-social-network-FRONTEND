import React, { useState, useEffect } from 'react';
//import { Link } from 'react-router-dom';
import Axios from 'axios';

import Loading from '../Loading/loading';
import RecursoNoExiste from './RecursoNoExiste';
import Avatar from '../Feed/postFeed/avatar';
import BotonLike from '../Feed/postFeed/botonLike';
import Comentarios from './Comentarios';
import ToComment from '../Feed/postFeed/ToComment';
import Main from '../General/Main'

import { toggleComentario, toggleLike } from '../../helpers/post-helpers'
//------------------- 1.- CSS Style && .env ---------------
import './estilosGetOnePost.css'
const baseURL = process.env.REACT_APP_RUTA_PRINCIPAL;
//------------------- 2.- Some functions ------------------
//------------------- 3.- PRINCIAPAL COMPONENT ------------
export default function GetOnePost({ mostrarError, match, usuario }) {
    const idUsuario = match.params.id;
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [postNoExiste, setPostNoExiste] = useState(false);
    const [enviandoLike, setEnviandoLike] = useState(false);
    //--------------------- 3.1- Functions---------------
    useEffect(() => {
        async function cargandoElPost() {
            try {
                const { data: postToShow } = await Axios.get(baseURL + `/inside/getOnePost/${idUsuario}`);
                setPost(postToShow[0]);
                setLoading(false);
            } catch (error) {
                if (error.response && (error.response.status === 404 || error.response.status === 400)) {
                    setPostNoExiste(true);
                } else {
                    mostrarError('Error en el servidor al cargar la publicación')
                }
                setLoading(false);
            }
        }
        cargandoElPost();
    }, [idUsuario, mostrarError])

    async function onSubmitComment(mensaje) {
        const updatedPost = await toggleComentario(post, mensaje, usuario)
        setPost(updatedPost);
    }
    async function onSubmitLike() {
        if (enviandoLike) {
            return;
        }
        try {
            setEnviandoLike(true);
            const updatedPost = await toggleLike(post);
            setPost(updatedPost);
            setEnviandoLike(false);
        } catch (error) {
            setEnviandoLike(false);
            mostrarError('Hubo un error al modificar al modificar el like');
            console.log(error)
        }
    }

    //---------------------- 3.2 Return------------------
    if (loading) {
        return (
            <Main X_Y_Centered={true}>
                <Loading />
            </Main>
        );
    }
    if (postNoExiste) {
        return (
            <Main X_Y_Centered={true}>
                <RecursoNoExiste mensaje={'La publicación a cargar no existe'}></RecursoNoExiste>
            </Main>
        );
    }
    if (post == null) {
        return null;
    }
    return (
        <Main>
            <Post
                {...post}
                mostrarError={mostrarError}
                onSubmitComment={onSubmitComment}
                onSubmitLike={onSubmitLike}
            />
        </Main>
    );
}
//------------------- 4 Other components ------------------
function Post({
    comentarioss,
    _id,
    url,
    usuario,
    estaLike,
    //Props that don´t belong to the post
    texto,
    mostrarError,
    onSubmitComment,
    onSubmitLike
}) {
    return (
        <div className="container">
            <div className="container post mt-2 mb-2" >
                <div className="row post__row" style={{ justifyContent: 'center' }}>
                    {/** IMAGEN */}
                    <div className="col-12 col-md-6 col-lg-6 pt-1 pb-1 post__imagen">
                        <img
                            src={url}
                            className="img-fluid post__imagen-img"
                            alt=""
                        />
                    </div>
                    {/** DATA */}
                    <div
                        className=" 
                col-12 col-md-6 col-lg-6 post__datos"
                    >
                        <Avatar
                            usuario={usuario}
                            tipoDeAvatar={2}
                        />
                        <Comentarios
                            usuario={usuario}
                            comentarioss={comentarioss}
                            texto={texto}
                            idUsuario={_id}
                            usuarioDelComentario={usuario}
                        />
                        <BotonLike
                            onSubmitLike={onSubmitLike}
                            estaLike={estaLike}
                        />
                        <ToComment
                            className=""
                            mostrarError={mostrarError}
                            onSubmitComment={onSubmitComment}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};