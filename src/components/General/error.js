import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

export default function Error({ mensaje, ocultarError }) {
    if(!mensaje){
        return null;
    }
    return (
        <div className="alert alert-danger d-flex justify-content-center p-1 m-0" role="alert">
            {mensaje}
            <button
                className="btn bg-transparent p-0 pl-2 pr-2"
                onClick={ocultarError}>
                <FontAwesomeIcon icon={faTimes} color="#9C1616" />
            </button>
        </div>
    );    
}