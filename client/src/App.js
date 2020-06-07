import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch, } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './components/Header.js'
import Browse from './components/Browse.js'
import Rankings from './components/Rankings.js'
import Create from './components/Create.js'
import Home from './components/home/Home.jsx';
import Login from './components/login/Login.jsx';
import Register from './components/login/Register.jsx';

function App() {
    return (
        <Router forceRefresh='true'>
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/browse">
                    <Browse />
                </Route>
                <Route path="/rankings">
                    <Rankings />
                </Route>
                <Route path="/create">
                    <Create />
                </Route>
                <Route path="/library">
                </Route>
                <Route path="/notifications">
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
