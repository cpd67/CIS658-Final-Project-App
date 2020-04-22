import * as React from 'react';

export const ErrorMessage = props => {
    const { message } = props;
    
    return (<div className="text-danger">{`${message}`}</div>);
}