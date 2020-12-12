import Axios from 'axios';

//Entramos para modificar el like del post
const baseURL = process.env.REACT_APP_RUTA_PRINCIPAL;

export async function toggleLike(post) {
    let postConLikeActualizado;
    if (post.estaLike) {
        //Si hay like, eliminamos el documento TRUE
        await Axios.delete(baseURL + `/inside/deleteLike/${post._id}`);
        postConLikeActualizado = {
            ...post,
            estaLike: false,
            numLikes: post.numLikes - 1
        }
    } else {
        //No hay like, lo creamos FALSE
        await Axios.post(baseURL + `/inside/postLike/${post._id}`);
        postConLikeActualizado = {
            ...post,
            estaLike: true,
            numLikes: post.numLikes + 1
        }
    }
    return postConLikeActualizado;
}

export async function toggleComentario(post, mensaje, usuario) {
    //let postConNewComentario;
    let { data: nuevoComentario } = await Axios.post(baseURL + `/inside/postComentario/${post._id}`, { mensaje });
    //"Populando" el usuario del nuevo comentarios
    nuevoComentario.usuario = usuario;
    let updatedPost = {
        ...post,
        numComentarios: post.numComentarios + 1,
        comentarioss: [...post.comentarioss, nuevoComentario]
    }
    return updatedPost;
}