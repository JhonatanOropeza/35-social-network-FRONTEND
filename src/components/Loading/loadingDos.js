import React from 'react'
import { Ring } from "react-awesome-spinners";

const heightForImage = {
    height: '80px',
    maxWidth: '200px' 
}

export default function Loading() {
    return (
            <div
                className="form-control d-flex justify-content-center align-items-center"
                style={heightForImage}>
                    <div className="ml-2 mr-2 "> 
                        <Ring/>
                    </div>
            </div>
    );
}