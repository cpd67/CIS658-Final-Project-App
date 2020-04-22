import * as React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';
import { Expenses } from './components/main/Expenses';
import { Categories } from './components/main/Categories';
import { About } from './components/main/About';
import { LoginForm } from './components/forms/LoginForm';
import { SignupForm } from './components/forms/SignupForm';
import { LogoutView } from './components/main/LogoutView';
import { ExpenseChart } from './components/main/ExpenseChart';
import { RouteNotFound } from './components/main/RouteNotFound';
import { ErrorMessage } from './components/main/ErrorMessage';
import API from './components/main/API';

/**
 * Main entrypoint of the React app.
 *
 * The following resources were helpful in getting navigation working:
 * https://stackoverflow.com/questions/54843302/reactjs-bootstrap-navbar-and-routing-not-working-together
 */
export const App = props => {
  const [user, setUser] = React.useState({});
  const [errorMessage, setErrorMessage] = React.useState("");

  const routes = [
    {
      path: "/",
      exact: true,
      content: () => <p className="home-page-text">Welcome! Click on the links in the nav to view your information.</p>
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
      label: "About",
      path: "/about",
      content: () => <About />
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
    }).catch(message => {
      setErrorMessage(message);
    })
  }, []);

  return (
    <Router>
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
                <Nav.Link key={2} as={Link} to={'/about'}>About</Nav.Link>
                </>
              )
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="container-fluid">
        {errorMessage ? <ErrorMessage message={errorMessage} /> : <></>}
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
              children={<p className="home-page-text">Hey there! Log in or sign up using the buttons in the top nav bar.</p>}
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
            <Route
              key={'d'}
              path="/about"
              exact={true}
              children={<About />}
            />
            <Route key={'e'} path="*" children={<RouteNotFound />} />
          </Switch>
          )
        }
      </div>
      <Navbar id="footer-nav" bg="success" variant="dark">
        <Nav className="mr-auto">
          <Nav.Link key={0} as={Link} to={'/'}>Money Trail</Nav.Link>
          <Nav.Link key={1} href={"https://github.com/cpd67/CIS658-Final-Project-App#developers"}>Developers</Nav.Link>
        </Nav>
      </Navbar>
    </Router>
    )
}

export default App;
