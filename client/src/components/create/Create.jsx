import React, { Component, Fragment, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BookList from './BookList';
import NewBookForm from './NewBookForm';
import { loadUser } from '../../actions/auth';
import { getBooksCreated } from '../../actions/creation';

const Create = ({
    user,
    books,
    isAuthenticated,
    getBooksCreated
}) => {
    useEffect(() => {
        loadUser();
        getBooksCreated(user._id);
    }, []);

    if (!isAuthenticated) {
        return <Redirect to='/login' />;
    }

    return (
        <Fragment>
            <NewBookForm />
            <BookList books={books} />
        </Fragment>
    )
}

Create.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object,
    books: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    books: state.creation.books,
});

export default connect(
    mapStateToProps,
    { loadUser, getBooksCreated }
)(Create);