import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { loadUser } from './actions/auth';
import Alert from './components/Alert';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/home/Home';
import Login from './components/authentications/Login';
import Register from './components/authentications/Register';
import Browse from './components/browse/Browse';
import Create from './components/create/Create';
import Rankings from './components/rankings/Rankings';
import Library from './components/library/Library';
import Notifications from './components/notifications/Notifications';
import Book from './components/book/Book';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/PrivateRoute';


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
                        <Route exact path="/book/:bookid" component={Book}>
                        </Route>

                        <PrivateRoute path="/create">
                            <Create />
                        </PrivateRoute>
                        <PrivateRoute path="/library">
                            <Library />
                        </PrivateRoute>
                        <PrivateRoute path="/notifications">
                            <Notifications />
                        </PrivateRoute>

                        <Route path="/login">
                            <Login />
                        </Route>

                        <Route path="/register">
                            <Register />
                        </Route>
                    </Switch>
                    <Footer />
                </div>
            </Router>
        </Provider>
    );
}

export default App;