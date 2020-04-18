import * as React from 'react';
import { useHistory } from 'react-router-dom';

import { apiUrl } from './utils';

export const LogoutView = props => {
    const { handleLogout } = props;
    const history = useHistory();

    const logoutUser = () => {
        fetch(`${apiUrl}/logout`, {
            method: 'DELETE',
            credentials: 'include'
        }).then(res => res.json()).then(data => {
            if(data.status === 200) {
                console.log(data);
            } else {
                console.error('Something went wrong!');
            }
        });
        handleLogout();
    }

    return (
        <div className="row">
            <div className="col-md-6">
                <h5>Are you sure you wish to logout?</h5>
                <button type="button" onClick={() => {logoutUser(); history.push('/');
                }} className="btn btn-primary mr-2">Yes</button>
                <button type="button" onClick={() => {// Redirect back to home page
                }} className="btn btn-secondary">No</button>
            </div>
        </div>
    )
}
