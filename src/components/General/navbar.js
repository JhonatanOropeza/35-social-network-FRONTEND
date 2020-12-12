import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCameraRetro, faCompass, faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import './general.css'

export default function Navbar({ usuario, logout }) {
    return (
        <div >
            <nav
                className="navbar navbar-expand navbar-light d-flex justify-content-between bg-info BARRA_DE_NAVEGACION">
                <Link className="navbar-brand" to="/">
                    <h2
                        className="mb-0 text-light nameInGenearl"
                    >ShareImage</h2>
                </Link>
                <div className="navbar-nav">
                    {usuario && <NavBarIcons usuario={usuario} logout={logout} />}
                </div>
            </nav>
        </div>
    )
}
function NavBarIcons({ usuario, logout }) {
    return (
        <>
            <Link className="nav-item nav-link" to="/loadImage">
                <FontAwesomeIcon icon={faCameraRetro} />
            </Link>
            <Link className="nav-item nav-link" to="/explore">
                <FontAwesomeIcon icon={faCompass} />
            </Link>
            <Link className="nav-item nav-link" to={`/profile/${usuario._id}`}>
                <FontAwesomeIcon icon={faUserCircle} />
            </Link>
            <button
                onClick={logout}
                className="nav-item nav-link bg-transparent border-0"
                style={{ outline: 'none' }}
            >
                <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
        </>
    );
}