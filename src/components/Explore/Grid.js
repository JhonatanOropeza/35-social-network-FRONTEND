import React from 'react';
import { Link } from 'react-router-dom';

import RecursoNoExiste from './../GetOnePost/RecursoNoExiste';
//---------------------------- 1.- CSS Style && .env ----------------------------------
import './estilos.css';
//---------------------------- 2.- Some functions -------------------------------------
//---------------------------- 3.- PRINCIAPAL COMPONENT -------------------------------
export default function GridComponent({ posts }) {
    //---------------------------- 3.1- Functions----------------------------------
    if (posts.message === "No hay resultados de la busqueda") {
        return (
            <RecursoNoExiste mensaje="Este usuario aún no ha realizado publicaciones" />
        );
    }
    const filas = posts.reduce((filas, post) => {
        const ultimafila = filas[filas.length - 1];

        //Si hay espacio en la última fila, insertamos post
        if (ultimafila && ultimafila.length < 3) {
            ultimafila.push(post);
        }
        //En caso de que no, abrimos nueva fila
        else {
            filas.push([post]);
        }
        return filas;
    }, []);

    //---------------------------- 3.2 Return--------------------------------------
    return (
        <>
            <div className="container bg-light bordeGrisParaExplorer pt-2 pb-2">
                {filas.map((fila, index) => {
                    return (
                        <div key={index} className="Grid__row ">
                            {fila.map((post) => {
                                return (
                                    <Link
                                        key={post._id}
                                        to={`/getOnePost/${post._id}`}
                                        className="Grid__post rounded"
                                    >
                                        <img
                                            src={post.url}
                                            alt=""
                                            className="Grid__post-img rounded bg-white bordeGrisParaExplorer"
                                        />
                                    </Link>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </>

    );
}


//---------------------------- 4 Other components -------------------------------------

