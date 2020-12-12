import React from 'react';
//import ReactTimeAgo from 'react-time-ago'
import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/es';

export default function LastSeen({ date }) {
    return (
        <div className="card-footer text-muted p-1">
            Agregado <Moment fromNow>{date}</Moment>
        </div>
    )
}