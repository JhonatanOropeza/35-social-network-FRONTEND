import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'

import Loading from '../Loading/loading'
import Post from './postFeed/PostOfFeed'
import Main from '../General/Main'
//---------------------------- 1.- CSS Style && .env ----------------------------------
const baseURL = process.env.REACT_APP_RUTA_PRINCIPAL;

//---------------------------- 2.- Some functions -------------------------------------
async function cargarPosts(datoDePaginacion) {
    return await Axios.get(baseURL + '/inside/getPosts/' + datoDePaginacion);
}

//---------------------------- 3.- PRINCIAPAL COMPONENT -------------------------------
export default function Inside({ mostrarError }) {
    //Estados para cargar los posts iniciales
    const [posts, setPosts] = useState([]);
    const [cargandoPostsIniciales, setCargandoPostsIniciales] = useState(true);
    //Estados para cagar más posts
    const [banderaCargarMasPosts, setBanderaCargarMasPosts] = useState(false);
    const [cargandoMasPosts, setCargandoMasPosts] = useState(false);
    //---------------------------- 3.1- Functions----------------------------------   
    useEffect(() => {
        async function cargarPostsIniciales() {
            try {
                setCargandoPostsIniciales(true);
                const { data } = await cargarPosts(1);
                //Si hay posts, insertamos los posts en el arreglo
                if (data.totalDocs > 0) {
                    setPosts(data.docs);
                }
                setCargandoPostsIniciales(false);
            } catch (error) {
                mostrarError('Error al cargar los POSTS');
                console.log(error);
                setCargandoPostsIniciales(false);
            }
        }
        cargarPostsIniciales();
    }, [mostrarError]);

    function updationgDataInPost(oldPost, newPost) {
        setPosts(() => {
            //1.- Recorriendo el arreglo de posts para encontrar el que se modificará
            const postActualizados = posts.map(post => {
                //2.- Si el post en el recordio es diferente al post a modifcar, el recorrdio continua
                if (post !== oldPost) {
                    return post;
                }
                //3.- Al haber coincidencia, sustituimos el post
                return newPost;
            });
            return postActualizados;
        });
    }
    async function cargarMasPosts() {
        if (cargandoMasPosts) {
            return;
        }
        //Calculando nueva página a solciitar
        let page;
        //1.- En caso de estar en la 1er página:
        if (posts.length === 3) {
            page = 2;
        } else
        //2.- Cuando son más de dos páginas:
        {
            page = Math.ceil(posts.length / 3) + 1;
        }
        try {
            setCargandoMasPosts(true);
            const { data } = await cargarPosts(page);
            const nuevosPosts = data.docs;
            const nuevoArreglo = posts.concat(nuevosPosts);
            setPosts(nuevoArreglo);
            //Verificar si podemos cargar más posts o ya no se
            const limit = data.limit;
            const actualPage = data.page;
            mostrarBotonNO_MAS_POSTS(limit, actualPage);
            setCargandoMasPosts(false);
        } catch (error) {
            setCargandoMasPosts(false);
            console.log('Error al cargar más posts')
        }
    }
    function mostrarBotonNO_MAS_POSTS(limit, actualPage) {
        if (limit === actualPage) {
            setBanderaCargarMasPosts(true);
        }
    }
    //---------------------------- 3.2 Return--------------------------------------
    // A) Loading
    if (cargandoPostsIniciales) {
        return (
            <Main X_Y_Centered={true}>
                <Loading/>
            </Main>
        );
    }
    // B) Mensaje de no hay posts disponibles
    if (!cargandoPostsIniciales && posts.length === 0) {
        return (
            <Main X_Y_Centered={true}>
                <NoSiguiesANadie/>
            </Main>
        );
    }
    // C) Mostrar posts
    return (
        <Main>
            {/** --------------------------------------------------- */}
            {/** -------------1.- Cargar Posts (3 en 3) -------------*/}
            {/** --------------------------------------------------- */}
            <div style={{ height: '100%', maxWidth: '520px' }} className="container">
                {posts.map((post) => (
                    <Post
                        key={post._id}
                        post={post}
                        mostrarError={mostrarError}
                        usuarioInPost={post.usuario}//Change the name to avoid repeat
                        updationgDataInPost={updationgDataInPost}
                    />
                ))}
            </div>
            {/** --------------------------------------------------- */}
            {/** -------------2.- Boton cargar más posts-------------*/}
            {/** --------------------------------------------------- */}
            <div className="container pt-4 pb-4 d-flex justify-content-center align-items-center">
                <BotonCargarMasPosts
                    cargarMasPosts={cargarMasPosts}
                    banderaCargarMasPosts={banderaCargarMasPosts}
                />
            </div>
        </Main>

    );
}

//---------------------------- 4 Other components -------------------------------------
function NoSiguiesANadie() {
    return (
        <div style={{ height: 'calc(100vh - 65px)' }}>
            <div className="container pt-4">
                <div className="card">
                    <div className="card-header text-center">
                        <h5 className="text-center">Mensaje</h5>
                    </div>
                    <div className="card-body ">
                        <p className="card-text text-center">Tu inicio no tiene fotos porque no sigues a nadie, o porque no han
        publicado fotos.</p>
                        <div className="container d-flex justify-content-center">
                            <Link to="/explore" className="btn btn-primary">Explora ImageShare</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function BotonCargarMasPosts({ banderaCargarMasPosts, cargarMasPosts }) {
    if (banderaCargarMasPosts) {
        return (
            <div className="alert alert-warning" role="alert">
                No hay más posts por mostrar
            </div>
        );
    }
    return (
        <button
            className="btn btn-info"
            onClick={cargarMasPosts}
        >
            Cargar más posts
        </button>
    );
}