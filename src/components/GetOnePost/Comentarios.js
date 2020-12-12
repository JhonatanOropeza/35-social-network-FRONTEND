import React from 'react';
import { Link } from 'react-router-dom';

//---------------------------- 1.- CSS Style && .env ----------------------------------
import './estilosGetOnePost.css'
//---------------------------- 2.- Some functions -------------------------------------
//---------------------------- 3.- PRINCIAPAL COMPONENT -------------------------------
export default function Comments({ comentarioss, texto, idUsuario, usuario }) {
    return (
        <ul className="comentarios__ul mb-0">
            <li style={{ listStyleType: 'none' }}>{/** Remove signo o punto al inicio */}
                <Link to={`/perfil/${idUsuario}`}>{usuario.nombre}
                </Link>{' '}
                {texto}
            </li>
            {comentarioss.map(comentario => {
                return (
                    <li
                        key={comentario._id}
                        className=""
                        style={{ listStyleType: 'none' }}//Remove signo o punto al inicio
                    >
                        <Link to={`/perfil/${comentario.usuario._id}`} >
                            {comentario.usuario.nombre}
                        </Link>{' '}
                        {comentario.mensaje}
                    </li>
                );
            })}
            </ul>
    );
};
//---------------------------- 3.1- Functions----------------------------------
//---------------------------- 3.2 Return--------------------------------------
//---------------------------- 4 Other components -------------------------------------
