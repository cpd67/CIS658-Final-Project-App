import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import { Navbar } from "./components/Navbar";
import { Categories } from './components/Categories';
import { Expenses } from './components/Expenses';

function App() {
  const routes = [
    {
      label: "Money Trail",
      path: "/",
      exact: true,
      content: () => <Expenses userId={1} />
    },
    {
      label: "Expenses",
      path: "/expenses",
      exact: true,
      content: () => <Expenses userId={1} />
    },
    {
      label: "Categories",
      path: "/categories",
      exact: true,
      content: () => <Categories />
    }
  ]

  return (
    <Router>
        <Navbar routes={routes} />
        <Switch>
          {routes.map((route, index) =>
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              children={route.content}
            />
          )}
        </Switch>
    </Router>
  )
}

export default App;
