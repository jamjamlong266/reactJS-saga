import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./containers/auth/Login";
import Register from "./containers/auth/Register";
import Header from "components/header";

import { store, persistor } from "./store/index";

import Dashboard from "containers/dashboard/Dashboard";
import TaskDetail from "containers/taskDetail";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <Header />

          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route path="/dashboard/:id" component={TaskDetail} />

            <Route exact path="/" component={Login} />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
