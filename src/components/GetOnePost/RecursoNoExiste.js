import React from 'react';
import { Link} from 'react-router-dom';
import './estilosGetOnePost.css';

export default function RecursoNoExiste({mensaje}){
    return(
        <div className="container pt-4 pb-2 text-center greyBorderWithRadius">
            <h4>{mensaje}</h4>
            <p>
                Ir al <Link to="/">inicio</Link>
            </p>
        </div>
    );
}