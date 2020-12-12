import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import Avatar from '../Feed/postFeed/avatar';
import Grid from './Grid';
import Main from '../General/Main';
import Loading from '../Loading/loading'

import './estilos.css'
//---------------------------- 1.- CSS Style && .env ----------------------------------
const baseURL = process.env.REACT_APP_RUTA_PRINCIPAL;

//---------------------------- 2.- Some functions -------------------------------------

//---------------------------- 3.- PRINCIAPAL COMPONENT -------------------------------
export default function Explore({ mostrarError }) {
    const [usuarios, setUsuarios] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    //---------------------------- 3.1- Functions----------------------------------
    useEffect(() => {
        async function cargandoUsuariosYPosts() {
            try {
                const [usuariosBK, postsBK] = await Promise.all(
                    [
                        Axios.get(baseURL + '/inside/explore/users').then(({ data }) => data),
                        Axios.get(baseURL + '/inside/explore/posts').then(({ data }) => data)
                    ]
                );
                setUsuarios(usuariosBK);
                setPosts(postsBK);
                setLoading(false);
            } catch (error) {
                console.log(error);
                mostrarError('Error al cargar Explore. Refresque la página');
                setLoading(false);
            }
        }
        cargandoUsuariosYPosts();
    }, [mostrarError])

    //---------------------------- 3.2 Return--------------------------------------
    if (loading) {
        return (
            <Main X_Y_Centered={true}>
                <Loading />
            </Main>
        );
    }
    return (
        <Main>
            {/** ---------------------------------------------------------*/}
            {/** MOSTRANDO USUARIOS */}
            {/** ---------------------------------------------------------*/}
            <div className="container pt-3">
                <h3>Descubrir usuarios</h3>
                <div className="contenedorPadreExploreUsers">
                    {usuarios.map((usuario) => {
                        return (
                            <div
                                key={usuario._id}
                                className="contenedorHijoExploreUsers bg-light bordeGrisParaExplorer"
                            >
                                <Avatar
                                    usuario={usuario}
                                    tipoDeAvatar={1}
                                    width={100}
                                    height={100}
                                />
                                <h6 className="">{usuario.nombre}</h6>
                                <Link to={`/profile/${usuario._id}`} className="btn btn-outline-info btn-sm">Ver Perfil</Link>
                            </div>
                        );
                    })}
                </div>
            </div>
            {/** ---------------------------------------------------------*/}
            {/** MOSTRANDO POSTS*/}
            {/** ---------------------------------------------------------*/}
            <div className="container">
                <h3>Explorar imaganes</h3>
                <Grid posts={posts} />
            </div>
        </Main>
    );
}

//---------------------------- 4 Other components -------------------------------------