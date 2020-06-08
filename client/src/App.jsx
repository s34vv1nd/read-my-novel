import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { loadUser } from './actions/authenticate';
import Alert from './components/Alert';
import Login from './components/authentications/Login.jsx';
import Register from './components/authentications/Register.jsx';
import Browse from './components/Browse.js';
import Create from './components/Create.js';
import Header from './components/Header';
import Home from './components/home/Home.jsx';
import Rankings from './components/Rankings.js';
import store from './store';
import setAuthToken from './utils/setAuthToken';


if (localStorage.token) {
    setAuthToken(localStorage.token);
}

function App() {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Alert />
                <div className="container">
                    <Header />
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
                </div>
            </Router>
        </Provider>
    );
}

export default App;
