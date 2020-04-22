import * as React from 'react';

export const About = props => {
    return (
        <div className="row about-page-text">
            <div className="col-md-7">
                <h3>Welcome to Money Trail!</h3>
                <p>In here, you can add, view, and track your daily expenses. 
                   You can also create categories and attach them to your expenses for greater visibility of where your money is going.
                   To get started, log in or sign up!
                </p>
                <h5>Developers</h5>
                <p>To view the source code for this web app, as well as important information related to the API it uses, <a href="https://github.com/cpd67/CIS658-Final-Project-App">Click here</a>.</p>
            </div>
        </div>
    )
}