import * as React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';
import { Expenses } from './components/main/Expenses';
import { Categories } from './components/main/Categories';
import { LoginForm } from './components/forms/LoginForm';
import { SignupForm } from './components/forms/SignupForm';
import { LogoutView } from './components/main/LogoutView';
import { ExpenseChart } from './components/main/ExpenseChart';
import { RouteNotFound } from './components/main/RouteNotFound';
import API from './components/main/API';

// https://stackoverflow.com/questions/54843302/reactjs-bootstrap-navbar-and-routing-not-working-together
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
      label: "Track",
      path: "/track",
      exact: true,
      content: () => <ExpenseChart user={user} />
    },
    {
      label: "Logout",
      path: "/log-out",
      exact: true,
      content: () => <LogoutView handleLogout={() => setUser({})}/>
    }
  ];

  React.useEffect(() => {
    API.fetchLoginStatus().then(data => {
      if(data.logged_in) {
        setUser(data.user);
      }
    })
  }, []);

  return (
    <Router>
      <div className="container-fluid">
          <Navbar collapseOnSelect expand="lg" bg="success" variant="dark">
            <Navbar.Brand as={Link} to={"/"}>Money Trail</Navbar.Brand>
            <Navbar.Toggle aria-controls="money-trail-nav" />
            <Navbar.Collapse id="money-trail-nav">
              <Nav className="mr-auto">
                {/* Show routes based off whether or not we have a user */}
                {typeof user.id !== 'undefined' ? routes.map((route, index) => <Nav.Link key={index} as={Link} to={route.path}>{route.label}</Nav.Link>)
                : (<>
                    <Nav.Link key={0} as={Link} to={'/login'}>Log in</Nav.Link>
                    <Nav.Link key={1} as={Link} to={'/signup'}>Sign up</Nav.Link>
                    </>
                  )
                }
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          {typeof user.id !== 'undefined' ? (
            <Switch>
                {routes.map((route, index) =>
                  <Route
                    key={100 + index}
                    path={route.path}
                    exact={route.exact}
                    children={route.content}
                  />
                )
                }
                <Route path="*" children={<RouteNotFound />} />
            </Switch>
            ) : (
            <Switch>
              <Route
                key={'a'}
                path="/"
                exact={true}
                children={<p>Hey there! Log in or sign up using the buttons in the top nav bar.</p>}
              />
              <Route
                key={'b'}
                path='/login'
                exact={true}
                children={<LoginForm onSubmit={setUser} />}
              />
              <Route
                key={'c'}
                path="/signup"
                exact={true}
                children={<SignupForm onSubmit={setUser} />}
              />
              <Route key={'d'} path="*" children={<RouteNotFound />} />
            </Switch>
           )
           }
      </div>
    </Router>
    )
}

export default App;
