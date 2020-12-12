import React from 'react'

export default function Main({X_Y_Centered, children }) {
    let classess = `${X_Y_Centered ? 'd-flex justify-content-center align-items-center' : ''}`;

    return(
        <main style={{paddingTop: '64px'}} className={classess}>{children}</main>
    );
}