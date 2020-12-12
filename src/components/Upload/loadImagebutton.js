import React, { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'

export default function LoadImageButton({ handleImagenSeleccionada }) {
    const [bgColor, setBgColor] = useState(false);

    let classesLabel = `rounded border border-light-dark card-body ${bgColor ? 'bg-primary' : 'bg-light'}`
    let classesIcon = `${bgColor ? 'text-light' : 'text-primary'}`;
    let classesSpan = `${bgColor ? 'text-light' : 'text-dark'}`;
    return (
        <label
            className={classesLabel}
            style={{ maxWidth: '200px' }}
            onMouseEnter={() => setBgColor(true)}
            onMouseLeave={() => setBgColor(false)}
        >
            <FontAwesomeIcon
                icon={faUpload}
                className={classesIcon} />
            <br />
            <span className={classesSpan}>Carga una foto</span>
            <input
                type="file"
                className="sr-only"
                name="image"
                onChange={handleImagenSeleccionada}
            />
        </label>
    );
}

