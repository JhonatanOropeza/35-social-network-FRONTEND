import Axios from 'axios';

const baseURL = process.env.REACT_APP_RUTA_PRINCIPAL;

export default async function toggleSeguimiento(userOfProfile){
    let usuarioActualizado;
    //Si hay seguimiento, lo eliminamos
    if (userOfProfile.seguimiento) {
        await Axios.delete(baseURL + `/inside/deleteAmistad/${userOfProfile._id}`);
        usuarioActualizado = {
            ...userOfProfile,
            seguimiento: false,
            numSeguidores: userOfProfile.numSeguidores - 1
        }
    }else{
        //De lo contrario, lo agregamos
        await Axios.post(baseURL + `/inside/postAmistad/${userOfProfile._id}`);
        usuarioActualizado = {
            ...userOfProfile,
            seguimiento: true,
            numSeguidores: userOfProfile.numSeguidores + 1
        }
    }
    return usuarioActualizado;
}