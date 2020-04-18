import * as React from 'react';
import { useLocation } from 'react-router-dom';

export const RouteNotFound = props => {
    const location = useLocation();

    return (
        <div className="row">
            <div className="col-md-6">
                <h6>No route found for {location.pathname}.</h6>
            </div>
        </div>
    );
}