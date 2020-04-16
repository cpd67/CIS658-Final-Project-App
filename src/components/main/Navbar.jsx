import * as React from 'react';
import { Link } from "react-router-dom";

// https://getbootstrap.com/docs/4.1/components/navbar/
export const Navbar = props => {
    const { routes } = props;

    return (
        <nav className="navbar navbar-expand navbar-light bg-light">
            <ul className="navbar-nav">
                {routes.map((route, index) =>
                    <li className="nav-item" key={index}>
                        <Link to={route.path} className="nav-link">{route.label}</Link>
                    </li>
                )}
            </ul>
        </nav>
    );
}