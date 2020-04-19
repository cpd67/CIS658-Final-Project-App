import * as React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';
import { Expenses } from './components/main/Expenses';
import { Categories } from './components/main/Categories';
import { LoginForm } from './components/forms/LoginForm';
import { SignupForm } from './components/forms/SignupForm';
import { LogoutView } from './components/main/LogoutView';
import { RouteNotFound } from './components/main/RouteNotFound';
import { apiUrl } from './components/main/utils';

// https://reacttraining.com/react-router/web/example/auth-workflow
// https://jaredpalmer.com/formik/
// https://getbootstrap.com/docs/4.0/getting-started/introduction/
export const App = props => {
  const [user, setUser] = React.useState({});

  const routes = [
    {
      path: "/",
      exact: true,
      content: () => <p>Welcome! Click on the links above to view your information.</p>
    },
    {
      label: "Expenses",
      path: "/expenses",
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

  const fetchLoginStatus = () => {
    fetch(`${apiUrl}/logged_in`, {
      method: 'GET',
      credentials: 'include'
    }).then(res => res.json()).then(data => {
      if(data.logged_in) {
        setUser(data.user);
      }
    });
  }

  React.useEffect(() => fetchLoginStatus(), []);

  return (
    <Router>
      <div className="container-fluid">
        {typeof user.id !== 'undefined' ? (
          <>
            <nav className="navbar navbar-expand navbar-dark bg-success">
              <Link className="navbar-brand" to="/">Money Trail</Link>
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
                <Link className="navbar-brand" to="/">Money Trail</Link>
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
                    children={<p>Hey there! Log in or sign up using the buttons in the top nav bar.</p>}
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
