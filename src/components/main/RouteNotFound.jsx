import * as React from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Display a "404" page for non-existent routes.
 *
 * The following resources were helpful when writing this component:
 * https://reacttraining.com/react-router/web/example/no-match
 */
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