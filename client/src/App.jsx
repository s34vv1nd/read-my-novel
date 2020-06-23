import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { loadUser } from './actions/auth';
import { loadGenres } from './actions/genres';
import { loadBooks } from './actions/books';
import Alert from './components/layout/Alert';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/home/Home';
import Login from './components/authentications/Login';
import Register from './components/authentications/Register';
import Browse from './components/browse/Browse';
import Create from './components/create/Create';
import Rankings from './components/rankings/Rankings';
import Library from './components/library/Library';
import Notifications from './components/notifications/Notifications';
import Book from './components/book/Book';
import Chapter from './components/book/Chapter';
import NewBookForm from './components/create/NewBookForm';
import UpdateBookForm from './components/create/UpdateBookForm';
import UpdateChapter from './components/create/UpdateChapter';
import UpdateBook from './components/create/UpdateBook';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';


if (localStorage.token) {
    setAuthToken(localStorage.token);
}

function App() {
    useEffect(() => {
        store.dispatch(loadUser());
        store.dispatch(loadGenres());
        store.dispatch(loadBooks());
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
                        
                        <Route exact path="/book/:bookid">
                            <Book />
                        </Route>
                        
                        <Route exact path="/book/:bookid/:chapid">
                            <Chapter />
                        </Route>

                        <Route exact path="/create/book/:bookid/chapter/:chapid">
                            <UpdateChapter />
                        </Route>

                        <Route exact path="/create/book/:bookid/update">
                            <UpdateBookForm />
                        </Route>
                        
                        <Route exact path="/create/book/:bookid">
                            <UpdateBook />
                        </Route>
                        
                        <PrivateRoute path="/create/book">
                            <NewBookForm />
                        </PrivateRoute>

                        <PrivateRoute exact path="/create">
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