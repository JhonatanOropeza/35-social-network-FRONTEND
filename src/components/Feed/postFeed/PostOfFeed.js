import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// import ReactTimeAgo from 'react-time-ago'

import Avatar from './avatar'
import BotonLike from './botonLike'
import LastSeen from './LastSeen'
//import Comments from "./comments";
import ToComment from './ToComment';
import { toggleLike, toggleComentario } from '../../../helpers/post-helpers'
//---------------------------- 1.- CSS Style && .env ----------------------------------
//---------------------------- 2.- Some functions -------------------------------------
//---------------------------- 3.- PRINCIAPAL COMPONENT -------------------------------
export default function Post({ post, mostrarError, usuarioInPost, updationgDataInPost }) {
    const [enviandoLike, setEnviandoLike] = useState(false);
    const {
        _id,
        url,
        usuario,
        texto,
        numLikes,
        numComentarios,
        comentarioss,
        estaLike,
        fechaCreacion
    } = post;

    async function onSubmitLike() {
        if (enviandoLike) {
            return;
        }
        try {
            setEnviandoLike(true);
            const updatedPost = await toggleLike(post);
            updationgDataInPost(post, updatedPost);
            setEnviandoLike(false);
        } catch (error) {
            setEnviandoLike(false);
            mostrarError('Hubo un error al modificar al modificar el like');
            console.log(error)
        }
    }
    async function onSubmitComment(mensaje) {
        const updatedPost = await toggleComentario(post, mensaje, usuarioInPost);
        updationgDataInPost(post, updatedPost);
    }
    //---------------------------- 3.1- Functions----------------------------------
    //---------------------------- 3.2 Return--------------------------------------
    return (
        <div className="card text-center mt-2">
            {/** 1.- Avatar */}
            <Avatar usuario={usuarioInPost} tipoDeAvatar={2} />
            {/** 2.- Imagen*/}
            <div className="d-flex justify-content-center">
                <img
                    src={url}
                    className="card-img-top"
                    style={{ maxWidth: '400px' }}
                    alt=""
                />
            </div>
            {/** 3.- Last seen*/}
            <LastSeen date={fechaCreacion}></LastSeen>
            {/** 4.- Like*/}
            <div className="card-body p-0 d-flex justify-content-start align-items-center">
                <BotonLike onSubmitLike={onSubmitLike} estaLike={estaLike} />
                {numLikes === 1 && 
                <p className="m-0">le gusta a {numLikes} persona</p>
                }
                {numLikes > 1 && 
                <p className="m-0">le gusta a {numLikes} personas</p>
                }
            </div>
            {/** 5 Usuario del post y su comentario*/}
            <div className="card-body p-0 ">
                <p className="text-left pl-2 mb-1">
                    <Link to={`/profile/${usuario._id}`} className="">{usuario.nombre}</Link>: {texto}
                </p>
            </div>
            {/** 6.- Comentarios y post de comentarios*/}
            <MensajeVerTodosLosComentarios
                numComentarios={numComentarios}
                id={_id}
            />
            <ComentariosDelPost
                comentarioss={comentarioss}
            />
            <ToComment
                onSubmitComment={onSubmitComment}
                mostrarError={mostrarError}
            ></ToComment>

        </div>
    );
}
//---------------------------- 4 Other components -------------------------------------
function MensajeVerTodosLosComentarios({ numComentarios, id }) {
    if (numComentarios < 4) {
        return <></>
    }
    return (
        <div>
            <p className="text-left pl-2 mb-1">
                <Link to={`/getOnePost/${id}`} className="text-secondary">Ver los {numComentarios} comentarios</Link>
            </p>
        </div>
    );
};

function ComentariosDelPost({ comentarioss }) {
    if (comentarioss.length === 0) {
        return null;
    }
    //1.- Imprimiendo los últimos tres comentarios
    let numComents = comentarioss.length;
    let comentarioss2;
    //1.2.- Inviriendo de comentarios para mostrarlos en el orden deseado
    if (numComents < 3) {
        comentarioss2 = comentarioss.slice(comentarioss.length - numComents);
    } else {
        comentarioss2 = comentarioss.slice(comentarioss.length - 3);
    }
    //2.- Imprimiendo los comentarios
    return (
        <div className="mb-2">
            {comentarioss2.map(comentario => {
                return (
                    <li
                        key={comentario._id}
                        className="text-left pl-2"
                        style={{ listStyleType: 'none' }}
                    >
                        <Link to="/" >
                            {comentario.usuario.nombre}
                        </Link>{' '}
                        {comentario.mensaje}
                    </li>
                );
            })
            }
        </div>
    );

};
