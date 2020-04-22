import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { ErrorMessage } from '../main/ErrorMessage';
import API from './API';

/**
 * Display a warning asking the User if they wish to log out.
 */
export const LogoutView = props => {
    const { handleLogout } = props;
    const history = useHistory();
    const [errorMessage, setErrorMessage] = React.useState("");

    return (
        <div className="row">
            <div className="col-md-6">
                <ErrorMessage message={errorMessage} />
                <h5>Are you sure you wish to logout?</h5>
                <button type="button" onClick={() => {
                    API.logoutUser().then(data => {
                        handleLogout();
                        history.push('/');
                    }).catch(message => {
                        setErrorMessage(message);
                    });
                }} className="btn btn-primary mr-2">Yes</button>
                <button type="button" onClick={() => {history.push('/')}} className="btn btn-secondary">No</button>
            </div>
        </div>
    )
}
