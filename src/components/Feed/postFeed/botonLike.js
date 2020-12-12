import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp as likeSolid} from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp as likeRegular } from '@fortawesome/free-regular-svg-icons'
//---------------------------- 1.- CSS Style && .env ----------------------------------
//---------------------------- 2.- Some functions -------------------------------------
//---------------------------- 3.- PRINCIAPAL COMPONENT -------------------------------
export default function BotonLike({onSubmitLike, estaLike}){
    //---------------------------- 3.1- Functions----------------------------------
//---------------------------- 3.2 Return--------------------------------------
    return (
        <button onClick={onSubmitLike} className="bg-transparent border-0 p-0 pl-2 pr-2" style={{ outline: 'none' }}>
            {
                estaLike ? 
                <FontAwesomeIcon icon={likeSolid} className="text-warning" />
                :
                <FontAwesomeIcon icon={likeRegular} className="text-warning" />
            }
        </button>
    );
}
//---------------------------- 4 Other components -------------------------------------