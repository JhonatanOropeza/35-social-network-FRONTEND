import React, { useState, useEffect, useMemo } from 'react';
import Axios from 'axios';
import { setToken, getToken, deleteToken } from '../../helpers/auth_helpers';

const baseURL = process.env.REACT_APP_RUTA_PRINCIPAL;

const UsuarioContext = React.createContext();

export function UsuarioProvider(props) {
    const [usuario, setUsuario] = useState(null);
    const [cargandoUsuario, setCargandoUsuario] = useState(true);

    useEffect(() => {
        //En caso de que haya toekn en LocalStorage
        async function cargarUsuario() {
            if (!getToken()) {
                setCargandoUsuario(false);
                return;
            }
            try {
                const { data } = await Axios.get(baseURL + '/inside/whoami');
                setUsuario(data.user);
                setCargandoUsuario(false);
            } catch (error) {
                console.log(error)
            }
        }
        cargarUsuario();
    }, []);

    async function login(correo, contrasena) {
        const { data } = await Axios.post(baseURL + '/login', {
            correo,
            contrasena
        });
        //console.log(data)
        setUsuario(data.user);
        setToken(data.token);
    }

    async function logup(nombre, correo, contrasena) {
        const { data } = await Axios.post(baseURL + '/logup', {
            nombre,
            correo,
            contrasena
        });
        //console.log(data.user)
        setUsuario(data.user);
        setToken(data.token);
    }

    function logout() {
        setUsuario(null);
        deleteToken();
    }

    const value = useMemo(() => {
        return ({
            usuario,
            cargandoUsuario,
            login,
            logup,
            logout
        })
    }, [usuario, cargandoUsuario]);//Se refresque con estos edos

    return <UsuarioContext.Provider value={value} {...props} />
}

export function useUsuario(){
    const context = React.useContext(UsuarioContext);
    if (!context) {
        throw new Error('useUsuario debe estar dentro del proveedor UsuaiorContext');
    }
    return context;
}