import React, { useState, useEffect } from 'react'

import Main from '../General/Main'
import Loading from '../Loading/loading'
import Axios from 'axios';
import RecursoNoExiste from '../GetOnePost/RecursoNoExiste';
import Avatar from '../Feed/postFeed/avatar';
import Grid from '../Explore/Grid';

import toggleSeguimiento from '../../helpers/amistad_helpers'

//------------------- 1.- CSS Style && .env ---------------
const baseURL = process.env.REACT_APP_RUTA_PRINCIPAL;

const styleForProfile = {
    borderBottom: '1px solid',
    borderColor: '#CBCBCB'
}
//------------------- 2.- Some functions ------------------
//------------------- 3.- PRINCIAPAL COMPONENT ------------
export default function Profile({ mostrarError, usuario, match, logout }) {
    const idUser = match.params.usuario;
    const [loading, setLoading] = useState(true);
    const [userOfProfile, setUserOfProfile] = useState(null);
    const [posts, setPosts] = useState([]);
    const [perfilNoExiste, setPerfilNoExiste] = useState(false);
    const [subiendoImagen, setSubiendoImagen] = useState(false);
    const [realizandoSeguimiento, setRealizandoSeguimiento] = useState(false);
    //--------------------- 3.1- Functions---------------
    useEffect(() => {
        async function cargandoPost() {
            try {
                setLoading(true);
                //Petición para traer datos del usuario
                const { data: user } = await Axios.get(baseURL + `/inside/getUserForProfile/${idUser}`);
                const { data: posts } = await Axios.get(baseURL + `/inside/getPostsOfOneUser/${user._id}`);
                //Petición para traer posts del usuario encontrado
                setUserOfProfile(user);
                setPosts(posts);
                setLoading(false);
            } catch (error) {
                if (error.response &&
                    (error.response.status === 404 || error.response.status === 400)) {
                    setPerfilNoExiste(true);
                } else {
                    mostrarError('Error al cargar el perfil del usuario');
                }
                setLoading(false);
            }
        }
        cargandoPost();
    }, [idUser, mostrarError]);

    function checkUserLogged_UserOfProfile() {
        return usuario._id === userOfProfile._id;
    }

    async function handleSubirImagen(event) {
        try {
            setSubiendoImagen(true);
            const file = event.target.files[0];
            const formData = new FormData();
            formData.append('imageProfile', file);
            console.log(userOfProfile);
            const { data } = await Axios.post(baseURL + '/inside/postImageProfile',
                formData,
                { headers: { "Content-type": "multipart/form-data" } }
            );
            setUserOfProfile({ ...userOfProfile, imagen: data.url });
            setSubiendoImagen(false);
        } catch (error) {
            mostrarError(error.response.data.message);
            setSubiendoImagen(false);
            console.log(error)
        }

    }

    async function onToggleSeguimiento() {
        if (realizandoSeguimiento) {
            return;
        }
        try {
            setRealizandoSeguimiento(true);
            const updatedPost = await toggleSeguimiento(userOfProfile);
            setUserOfProfile(updatedPost);
            setRealizandoSeguimiento(false);
        } catch (error) {
            setRealizandoSeguimiento(false);
            mostrarError(error.response.data.message);
            console.log(error);
        }
    }
    //---------------------- 3.2 Return------------------
    if (loading) {//loading
        return (
            <Main X_Y_Centered={true}>
                <Loading />
            </Main>
        );
    }
    if (perfilNoExiste) {//perfilNOExiste
        return (
            <Main X_Y_Centered={true}>
                <RecursoNoExiste mensaje="El perfil que estas intentando ver no existe" />
            </Main>
        );
    }
    if (userOfProfile === null) {
        return null;
    }
    return (
        <Main>
            {/** -------------------------------- */}
            {/**           User data              */}
            {/** -------------------------------- */}
            <div className="container pt-2">
                <div className="row mb-2" style={styleForProfile}>
                    {/** Columna 1 */}
                    {/** AVATAR */}
                    <div className="
                        col-4 col-md col-lg-4 col-xl-4
                        d-flex align-items-center justify-content-center
                        ">
                        <Avatar
                            usuario={userOfProfile}
                            tipoDeAvatar={3}
                            width={100}
                            height={100}
                            checkUserLogged_UserOfProfile={checkUserLogged_UserOfProfile()}
                            subiendoImagen={subiendoImagen}
                            handleSubirImagen={handleSubirImagen}
                        />
                    </div>
                    {/** Columna 2 */}
                    {/** NOMBRE Y BOTÓN */}
                    <div className="col-8 col-md col-lg-4 col-xl-4">
                        <div className="row">
                            <div className="col- col-md col-lg">
                                <h4>{userOfProfile.nombre}</h4>
                            </div>
                            <div className="col- col-md col-lg d-flex align-center mt-1">
                                {!checkUserLogged_UserOfProfile() &&
                                    <BotonSeguimiento
                                        seguimiento={userOfProfile.seguimiento}
                                        toggleSeguimiento={onToggleSeguimiento}
                                    />
                                }
                                {checkUserLogged_UserOfProfile() &&
                                    <BotonLogout
                                        logout={logout}
                                    />
                                }
                            </div>
                        </div>
                        {/** DESCRIPCIÓN*/}
                        <div className="col-12 col-md-12 col-lg-12 col-xl-12">
                            <Descripcion
                                checkUserLogged_UserOfProfile={checkUserLogged_UserOfProfile()}
                                userOfProfile={userOfProfile} />
                        </div>
                    </div>

                    {/** Columna 3 */}
                    <div className="col-0 col-md-0 col-lg-4 col-xl-4">

                    </div>
                </div>
            </div>
            {/** -------------------------------- */}
            {/**         Grid of posts            */}
            {/** -------------------------------- */}
            <div className="container">
                <h3>Publicaciones</h3>
                <Grid posts={posts} />
            </div>
        </Main>
    );
}

//------------------- 4 Other components ------------------
function BotonSeguimiento({ toggleSeguimiento, seguimiento }) {
    return (
        <button onClick={toggleSeguimiento} className="btn btn-outline-secondary btn-sm">
            {seguimiento ? 'Dejar de seguir' : 'Seguir'}
        </button>
    );
}

function BotonLogout({ logout }) {
    return (
        <button onClick={logout} className="btn btn-outline-secondary btn-sm">
            Cerrar sesión
        </button>
    );
}

function Descripcion({ checkUserLogged_UserOfProfile, userOfProfile }) {
    if (checkUserLogged_UserOfProfile) {
        return (
            <>
                <h6 className="mt-1 mb-1">Correo: {userOfProfile.correo}</h6>
                <p className="mb-0">Tienes <b>{userOfProfile.numSeguidores}</b> seguidores.</p>
                <p className="mb-1">Estas siguiendo a <b>{userOfProfile.numSiguiendo}</b> personas.</p>
            </>
        );
    } else {
        return (
            <>
                <h6 className="mt-1 mb-1">Correo: {userOfProfile.correo}</h6>
                <p className="mb-0">Tiene <b>{userOfProfile.numSeguidores}</b> seguidores.</p>
                <p className="mb-1">Esta siguiendo a <b>{userOfProfile.numSiguiendo}</b> personas.</p>
            </>
        );
    }
}