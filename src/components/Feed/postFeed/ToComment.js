import React, { useState } from 'react';

//---------------------------- 1.- CSS Style && .env ----------------------------------
//---------------------------- 2.- Some functions -------------------------------------
//---------------------------- 3.- PRINCIAPAL COMPONENT -------------------------------
export default function ToComponent({ onSubmitComment, mostrarError}) {
    const [mensajeDelPost, setMensajeDelPost] = useState('');
    const [enviandoComentario, setEnviandoComentario] = useState(false);
    //---------------------------- 3.1- Functions----------------------------------
    async function handleSubmit(e) {
        e.preventDefault();
        if (mensajeDelPost === '') {
            mostrarError('Debes escribir un mensaje');
            return;
        }
        if (enviandoComentario) {
            return;
        }
        try {
            setEnviandoComentario(true);
            await onSubmitComment(mensajeDelPost);
            setMensajeDelPost('');
            setEnviandoComentario(false);
        } catch (error) {
            setEnviandoComentario(false);
            mostrarError('Hubo un error al realizar comentario, intente de nuevo');
            console.log(error)
        }
    }
    //---------------------------- 3.2 Return--------------------------------------
    return (
        <div>
            <form onSubmit={handleSubmit} className="form-group m-0">
                <div className="input-group mb-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Deja tu comentario"
                        aria-label="Deja tu comentario"
                        aria-describedby="button-addon2"
                        required
                        maxLength="150"
                        value={mensajeDelPost}
                        onChange={e => setMensajeDelPost(e.target.value)}
                    />
                    <div className="input-group-append">
                        <button
                            type="submit"
                            className="btn btn-outline-secondary"
                            id="button-addon2">
                            Comentar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

//---------------------------- 4 Other components -------------------------------------
