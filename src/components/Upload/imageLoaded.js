import React from 'react'

export default function ImageLoaded({imagenURL}) {
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" >
            <div className="row">
                <img src={imagenURL} alt="" className="img-fluid rounded border border-secondary" style={{ maxWidth: '298px', maxHeight: '186px' }} />
            </div>
        </div>
    );
}