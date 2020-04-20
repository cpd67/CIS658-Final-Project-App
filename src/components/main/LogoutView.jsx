import * as React from 'react';
import { useHistory } from 'react-router-dom';
import API from './API';

export const LogoutView = props => {
    const { handleLogout } = props;
    const history = useHistory();

    return (
        <div className="row">
            <div className="col-md-6">
                <h5>Are you sure you wish to logout?</h5>
                <button type="button" onClick={() => {
                    API.logoutUser(handleLogout).then(data => {
                        if(data.status === 200) {
                            console.log(data);
                        } else {
                            console.error('Something went wrong!');
                        }
                    });
                    history.push('/');
                }} className="btn btn-primary mr-2">Yes</button>
                <button type="button" onClick={() => {history.push('/')}} className="btn btn-secondary">No</button>
            </div>
        </div>
    )
}
