import * as React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';
import { Expenses } from './components/main/Expenses';
import { Categories } from './components/main/Categories';
import { LoginForm } from './components/forms/LoginForm';
import { SignupForm } from './components/forms/SignupForm';
import { LogoutView } from './components/main/LogoutView';
import { RouteNotFound } from './components/main/RouteNotFound';

// https://reacttraining.com/react-router/web/example/auth-workflow
// https://jaredpalmer.com/formik/
// https://getbootstrap.com/docs/4.0/getting-started/introduction/
export const App = props => {
  const [user, setUser] = React.useState({});

  const routes = [
    {
      label: "Money Trail",
      path: "/",
      exact: true,
      content: () => <Expenses user={user} />
    },
    {
      label: "Expenses",
      path: "/expenses",
      exact: true,
      content: () => <Expenses user={user} />
    },
    {
      label: "Categories",
      path: "/categories",
      exact: true,
      content: () => <Categories user={user} />
    },
    {
      label: "Logout",
      path: "/log-out",
      exact: true,
      content: () => <LogoutView handleLogout={() => setUser({})}/>
    }
  ];

  return (
    <Router>
      <div className="container-fluid">
        {typeof user.id !== 'undefined' ? (
          <>
            <nav className="navbar navbar-expand navbar-dark bg-success">
              <ul className="navbar-nav">
                {routes.map((route, index) =>
                  <li className="nav-item" key={index}>
                    <Link to={route.path} className="nav-link">{route.label}</Link>
                  </li>
                  )
                }
              </ul>
            </nav>
            <Switch>
              {routes.map((route, index) =>
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  children={route.content}
                />
              )}
              <Route path="*" children={<RouteNotFound />} />
            </Switch>
          </>
          ) : (
            <>
              <nav className="navbar navbar-expand navbar-dark bg-success">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link to={'/login'} className="nav-link">Log in</Link>
                  </li>
                  <li className="nav-item">
                    <Link to={'/signup'} className="nav-link">Sign up</Link>
                  </li>
                </ul>
              </nav>
              <Switch>
                  <Route
                    path="/"
                    exact={true}
                    children={<p>You must login to view any content.</p>}
                  />
                  <Route
                    path='/login'
                    exact={true}
                    children={<LoginForm onSubmit={setUser} />}
                  />
                  <Route
                    path="/signup"
                    exact={true}
                    children={<SignupForm onSubmit={setUser} />}
                  />
                  <Route path="*" children={<RouteNotFound />} />
              </Switch>
            </>
          )
        }
      </div>
    </Router>
    )
}

export default App;
